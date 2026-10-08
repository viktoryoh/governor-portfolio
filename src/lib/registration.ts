export const localGovernments = [
  "Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", "Etim Ekpo", "Etinan",
  "Ibeno", "Ibesikpo Asutan", "Ibiono Ibom", "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene",
  "Ini", "Itu", "Mbo", "Mkpat Enin", "Nsit Atai", "Nsit Ibom", "Nsit Ubium", "Obot Akara",
  "Okobo", "Onna", "Oron", "Oruk Anam", "Udung Uko", "Ukanafun", "Uruan", "Urue Offong Oruko", "Uyo",
] as const;

export type Registration = {
  submissionId: string;
  surname: string;
  firstName: string;
  email: string;
  phone: string;
  address: string;
  localGovernment: string;
  consent: boolean;
  website: string;
};
export type FieldErrors = Partial<Record<keyof Registration, string>>;

export function validateRegistration(input: unknown): { data: Registration; errors: FieldErrors } {
  const raw = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const text = (key: string) => typeof raw[key] === "string" ? raw[key].trim() : "";
  const data: Registration = {
    submissionId: text("submissionId"), surname: text("surname"), firstName: text("firstName"),
    email: text("email").toLowerCase(), phone: text("phone"), address: text("address"),
    localGovernment: text("localGovernment"), consent: raw.consent === true, website: text("website"),
  };
  const errors: FieldErrors = {};
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.submissionId)) errors.submissionId = "Please refresh the page and try again.";
  for (const key of ["surname", "firstName"] as const) {
    if (!data[key] || data[key].length > 80) errors[key] = "Enter a name of up to 80 characters.";
  }
  if (data.email && (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))) errors.email = "Enter a valid email address.";
  const digits = data.phone.replace(/\D/g, "");
  if (!/^\+?[\d ()-]+$/.test(data.phone) || digits.length < 7 || digits.length > 15) errors.phone = "Enter a valid phone number.";
  if (data.address.length > 500) errors.address = "Keep the address under 500 characters.";
  if (!(localGovernments as readonly string[]).includes(data.localGovernment)) errors.localGovernment = "Choose your local government area.";
  if (!data.consent) errors.consent = "Please agree before registering.";
  if (data.website) errors.website = "Registration could not be accepted.";
  return { data, errors };
}
