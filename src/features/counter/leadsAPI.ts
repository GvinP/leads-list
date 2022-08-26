import axios from "axios";

export const BASE_URL = 'https://leads-list-server.herokuapp.com'

export const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export const leadsAPI = {
    fetchLeads(query: string | undefined) {
        return instance.get<RootObject>(`/api/leads?query=${query? query : ''}`)
    },
}

export interface Value {
  value: any;
  enum_id?: number;
  enum_code?: any;
}

export interface CustomFieldsValue {
  field_id: number;
  field_name: string;
  field_code?: any;
  field_type: string;
  values: Value[];
  is_computed: boolean;
}

export interface Self {
  href: string;
}

export interface Links {
  self: Self;
}

export interface Tag {
  id: number;
  name: string;
  color?: any;
}

export interface Self2 {
  href: string;
}

export interface Links2 {
  self: Self2;
}

export interface Company {
  id: number;
  _links: Links2;
}

export interface Self3 {
  href: string;
}

export interface Links3 {
  self: Self3;
}

export interface Contact {
  id: number;
  is_main: boolean;
  _links: Links3;
}

export interface Embedded {
  tags: Tag[];
  companies: Company[];
  contacts: Contact[];
}

export interface Value2 {
  value: string;
  enum_id: number;
  enum_code: string;
}

export interface CustomFieldsValue2 {
  field_id: number;
  field_name: string;
  field_code: string;
  field_type: string;
  values: Value2[];
}

export interface Self4 {
  href: string;
}

export interface Links4 {
  self: Self4;
}

export interface Tag2 {
  id: number;
  name: string;
  color?: any;
}

export interface Self5 {
  href: string;
}

export interface Links5 {
  self: Self5;
}

export interface Company2 {
  id: number;
  _links: Links5;
}

export interface Embedded2 {
  tags: Tag2[];
  companies: Company2[];
}

export interface Contact2 {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  responsible_user_id: number;
  group_id: number;
  created_by: number;
  updated_by: number;
  created_at: number;
  updated_at: number;
  closest_task_at?: any;
  is_deleted: boolean;
  is_unsorted: boolean;
  custom_fields_values: CustomFieldsValue2[];
  account_id: number;
  _links: Links4;
  _embedded: Embedded2;
}

export interface Lead {
  id: number;
  name: string;
  price: number;
  responsible_user_id: number;
  group_id: number;
  status_id: number;
  pipeline_id: number;
  loss_reason_id?: any;
  created_by: number;
  updated_by: number;
  created_at: number;
  updated_at: number;
  closed_at?: any;
  closest_task_at?: any;
  is_deleted: boolean;
  custom_fields_values: CustomFieldsValue[];
  score?: any;
  account_id: number;
  labor_cost: number;
  is_price_computed: boolean;
  _links: Links;
  _embedded: Embedded;
  contacts: Contact2[];
}

export interface User {
  id: number;
  name: string;
}

export interface Self6 {
  href: string;
}

export interface Links6 {
  self: Self6;
}

export interface Self7 {
  href: string;
}

export interface Links7 {
  self: Self7;
}

export interface Status {
  id: number;
  name: string;
  sort: number;
  is_editable: boolean;
  pipeline_id: number;
  color: string;
  type: number;
  account_id: number;
  _links: Links7;
}

export interface Embedded3 {
  statuses: Status[];
}

export interface Pipeline {
  id: number;
  name: string;
  sort: number;
  is_main: boolean;
  is_unsorted_on: boolean;
  is_archive: boolean;
  account_id: number;
  _links: Links6;
  _embedded: Embedded3;
}

export interface RootObject {
  leads: Lead[];
  users: User[];
  pipelines: Pipeline;
}
