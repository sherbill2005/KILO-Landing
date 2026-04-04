const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DUPLICATE_ERROR_CODE = "23505";

type WaitlistInsertError = {
  code?: string;
  message?: string;
} | null;

type WaitlistClient = {
  from: (table: string) => {
    insert: (
      values: Array<{
        email: string;
      }>
    ) => PromiseLike<{
      error: WaitlistInsertError;
    }>;
  };
};

type WaitlistSubmissionResult =
  | { success: true }
  | { success: false; error: string };

function isDuplicateWaitlistError(error: WaitlistInsertError) {
  return error?.code === DUPLICATE_ERROR_CODE;
}

export function getWaitlistErrorMessage(error: WaitlistInsertError) {
  if (isDuplicateWaitlistError(error)) {
    return "You're already on the waitlist.";
  }

  return "We couldn't save your email. Please try again.";
}

export async function submitWaitlistEmail(
  client: WaitlistClient,
  rawEmail: string
): Promise<WaitlistSubmissionResult> {
  const email = rawEmail.trim();

  if (!EMAIL_PATTERN.test(email)) {
    return {
      success: false,
      error: "Enter a valid email address.",
    };
  }

  const { error } = await client.from("waitlist").insert([{ email }]);

  if (error) {
    return {
      success: false,
      error: getWaitlistErrorMessage(error),
    };
  }

  return { success: true };
}

export async function ensureWaitlistEmail(
  client: WaitlistClient,
  rawEmail: string
): Promise<WaitlistSubmissionResult> {
  const result = await submitWaitlistEmail(client, rawEmail);

  if (!result.success && result.error === "You're already on the waitlist.") {
    return { success: true };
  }

  return result;
}
