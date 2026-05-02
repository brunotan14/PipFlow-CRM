export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PlanType = "free" | "pro";
export type MemberRole = "admin" | "member";
export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "unqualified"
  | "customer";
export type DealStage =
  | "new_lead"
  | "contacted"
  | "proposal_sent"
  | "negotiation"
  | "closed_won"
  | "closed_lost";
export type ActivityType = "call" | "email" | "meeting" | "note";

export interface Database {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string;
          name: string;
          plan: PlanType;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          onboarding_done: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          plan?: PlanType;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          onboarding_done?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["workspaces"]["Insert"]>;
      };
      workspace_members: {
        Row: {
          id: string;
          workspace_id: string;
          user_id: string;
          role: MemberRole;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          user_id: string;
          role?: MemberRole;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["workspace_members"]["Insert"]
        >;
      };
      leads: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          email: string | null;
          phone: string | null;
          company: string | null;
          position: string | null;
          status: LeadStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          company?: string | null;
          position?: string | null;
          status?: LeadStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
      deals: {
        Row: {
          id: string;
          workspace_id: string;
          lead_id: string | null;
          title: string;
          value: number | null;
          stage: DealStage;
          owner_id: string | null;
          due_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          lead_id?: string | null;
          title: string;
          value?: number | null;
          stage?: DealStage;
          owner_id?: string | null;
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["deals"]["Insert"]>;
      };
      activities: {
        Row: {
          id: string;
          workspace_id: string;
          lead_id: string;
          type: ActivityType;
          description: string;
          author_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          lead_id: string;
          type: ActivityType;
          description: string;
          author_id: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["activities"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      plan_type: PlanType;
      member_role: MemberRole;
      lead_status: LeadStatus;
      deal_stage: DealStage;
      activity_type: ActivityType;
    };
  };
}
