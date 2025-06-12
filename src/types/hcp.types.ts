export interface IHcp {
  id: string;
  labels: string;
  name: string;
  images: string;
  role: string;
  dob: string;
  address: string;
  headline: string;
  bio: string;
  education: IEducation[];
  peers: number;
  following: number;
  patientServed: number;
  successRate: number;
}

export interface IEducation {
  name: string;
  field: string;
  specialization: string;
  period: ["Sep 2015", "Jun 2020"];
}
