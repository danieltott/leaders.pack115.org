export type Den = {
  "Den Leaders"?: string[];
  "Current Rank": string;
  Scouts?: string[];
  "Den Name": string;
  Name: string;
  "Den Leader Addresses"?: string[];
  "Den Leader Phones"?: string[];
  "Den Leader Emails"?: string[];
  "Den Leader Names"?: string[];
};

export type Status = "Active" | "Potential" | "Graduated" | "Inactive";

export type Scout = {
  Parents?: string[];
  "Parent Names": string[];
  School?: string;
  "Scout Name": string;
  Den?: string[];
  "Cub Haunted Signups"?: string[];
  Status?: Status;
  "Cub Haunted Submitted"?: string[];
  /**
   * UTC date, e.g. "2014-09-05".
   */
  "Health form"?: string;
  Notes?: string;
  Tags?: string[];
  "Primary Email"?: string;
  "Primary Address"?: string;
  "Primary Phone"?: string;
  "All Emails"?: string;
};

export type Adult = {
  Dens?: string[];
  Positions?: string[];
  Status?: string;
  Email?: string;
  "Youth Protection due date"?: string;
  "Campout Signups"?: string[];
  /**
   * UTC date, e.g. "2014-09-05".
   */
  "Health form"?: string;
  "No payment required"?: boolean;
  Notes?: string;
  Name: string;
  Phone?: string;
  Scouts?: string[];
  "Phone Alt"?: string;
  Address?: string;
};

export type Position = {
  "Position Code"?: string;
  "Required for Re-Charter"?: boolean;
  Adults?: string[];
  Name?: string;
};

export type CubHauntedSignup = {
  "Total Day Passes"?: number;
  "Scout(s)"?: string[];
  "T-Shirt Sizes"?: string;
  "Additional Children"?: string;
  "Sleeping Preference"?: string;
  "Additional Adults"?: string;
  "Permission Checkbox"?: boolean;
  Paid?: boolean;
  "Total Weekend Passes"?: number;
  Notes?: string;
  "Adult(s)"?: string[];
  "Row ID"?: string;
  "Total Owed"?: number;
  Submitted?: string;
  Emails?: string[];
  "Scouts Den"?: string[];
  "Scout Health Forms"?: string[];
  "Adult Health Forms"?: string[];
};

export type Data = {
  dens: Record<string, Den>;
  scouts: Record<string, Scout>;
  adults: Record<string, Adult>;
  positions: Record<string, Position>;
  cubHauntedSignups: Record<string, CubHauntedSignup>;
};

export type Ids = Record<keyof Data, string[]>;

export type AllData = {
  data: Data;
  ids: Ids;
};
