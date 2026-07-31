export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      wishes: {
        Row: {
          id: string
          name: string
          message: string
          hearts: number
          created_at: string
        }
        Insert: {
          id?: string
          name?: string
          message: string
          hearts?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          message?: string
          hearts?: number
          created_at?: string
        }
        Relationships: []
      }
      blessings: {
        Row: {
          id: string
          label: string
          hearts: number
          created_at: string
        }
        Insert: {
          id?: string
          label: string
          hearts?: number
          created_at?: string
        }
        Update: {
          id?: string
          label?: string
          hearts?: number
          created_at?: string
        }
        Relationships: []
      }
      rsvps: {
        Row: {
          id: string
          name: string
          attending: boolean
          guests: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          attending: boolean
          guests?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          attending?: boolean
          guests?: number
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: {
      increment_wish_hearts: {
        Args: { row_id: string; delta?: number }
        Returns: undefined
      }
      increment_blessing_hearts: {
        Args: { row_id: string; delta?: number }
        Returns: undefined
      }
    }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
