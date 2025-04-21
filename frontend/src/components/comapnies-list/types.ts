import { Company } from "../../hooks/use-companies-list/types";

export interface TableBodyProps {
  companies: Company[];
  canDeleteCompany: boolean;
  canUpdateCompany: boolean;
}

export interface TableProps {
  companies: Company[];
  canDeleteCompany: boolean;
  canUpdateCompany: boolean;
}

export interface CompaniesListProps {
  canDeleteCompany?: boolean;
  canCreateCompany?: boolean;
  canUpdateCompany?: boolean;
}

export interface ActionsProps {
  company: Company;
  canDeleteCompany: boolean;
  canUpdateCompany: boolean;
}
