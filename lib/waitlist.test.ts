import { describe, expect, it, vi } from "vitest";
import { ensureWaitlistEmail, submitWaitlistEmail } from "./waitlist";

type FakeInsertResult = {
  error: {
    code?: string;
    message?: string;
  } | null;
};

function createClient(result: FakeInsertResult) {
  const insert = vi.fn(async () => result);
  const from = vi.fn(() => ({ insert }));

  return {
    client: { from },
    insert,
    from,
  };
}

describe("submitWaitlistEmail", () => {
  it("trims a valid email and inserts it into waitlist", async () => {
    const { client, from, insert } = createClient({ error: null });

    const result = await submitWaitlistEmail(client, "  hello@example.com  ");

    expect(result).toEqual({ success: true });
    expect(from).toHaveBeenCalledWith("waitlist");
    expect(insert).toHaveBeenCalledWith([{ email: "hello@example.com" }]);
  });

  it("returns a duplicate message when Supabase reports a unique violation", async () => {
    const { client } = createClient({
      error: {
        code: "23505",
        message: "duplicate key value violates unique constraint",
      },
    });

    const result = await submitWaitlistEmail(client, "hello@example.com");

    expect(result).toEqual({
      success: false,
      error: "You're already on the waitlist.",
    });
  });

  it("rejects an invalid email before calling Supabase", async () => {
    const { client, from, insert } = createClient({ error: null });

    const result = await submitWaitlistEmail(client, "not-an-email");

    expect(result).toEqual({
      success: false,
      error: "Enter a valid email address.",
    });
    expect(from).not.toHaveBeenCalled();
    expect(insert).not.toHaveBeenCalled();
  });
});

describe("ensureWaitlistEmail", () => {
  it("treats duplicate emails as success for OAuth waitlist joins", async () => {
    const { client } = createClient({
      error: {
        code: "23505",
        message: "duplicate key value violates unique constraint",
      },
    });

    const result = await ensureWaitlistEmail(client, "hello@example.com");

    expect(result).toEqual({ success: true });
  });
});
