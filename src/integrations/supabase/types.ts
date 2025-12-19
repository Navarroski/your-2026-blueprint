export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      books: {
        Row: {
          author: string | null
          block: string | null
          completed: boolean | null
          completed_date: string | null
          created_at: string
          current_page: number | null
          end_date: string | null
          id: string
          is_extra: boolean | null
          notes: string | null
          pages: number | null
          rating: number | null
          start_date: string | null
          title: string
          updated_at: string
          user_id: string
          week: number | null
        }
        Insert: {
          author?: string | null
          block?: string | null
          completed?: boolean | null
          completed_date?: string | null
          created_at?: string
          current_page?: number | null
          end_date?: string | null
          id?: string
          is_extra?: boolean | null
          notes?: string | null
          pages?: number | null
          rating?: number | null
          start_date?: string | null
          title: string
          updated_at?: string
          user_id: string
          week?: number | null
        }
        Update: {
          author?: string | null
          block?: string | null
          completed?: boolean | null
          completed_date?: string | null
          created_at?: string
          current_page?: number | null
          end_date?: string | null
          id?: string
          is_extra?: boolean | null
          notes?: string | null
          pages?: number | null
          rating?: number | null
          start_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          week?: number | null
        }
        Relationships: []
      }
      daily_checkins: {
        Row: {
          created_at: string
          date: string
          id: string
          notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      exercise_phases: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          phase_number: number | null
          start_date: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          phase_number?: number | null
          start_date?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          phase_number?: number | null
          start_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      exercises: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          target_muscles: string[] | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          target_muscles?: string[] | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          target_muscles?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      goal_milestones: {
        Row: {
          completed: boolean | null
          completed_date: string | null
          created_at: string
          goal_id: string
          id: string
          title: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_date?: string | null
          created_at?: string
          goal_id: string
          id?: string
          title: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_date?: string | null
          created_at?: string
          goal_id?: string
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goal_milestones_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      goal_monthly_tracking: {
        Row: {
          completed: boolean | null
          created_at: string
          goal_id: string
          id: string
          month: number
          notes: string | null
          user_id: string
          value: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          goal_id: string
          id?: string
          month: number
          notes?: string | null
          user_id: string
          value?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          goal_id?: string
          id?: string
          month?: number
          notes?: string | null
          user_id?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "goal_monthly_tracking_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          category: string | null
          completed: boolean | null
          completed_date: string | null
          created_at: string
          description: string | null
          has_monthly_tracking: boolean | null
          id: string
          notes: string | null
          progress: number | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          completed?: boolean | null
          completed_date?: string | null
          created_at?: string
          description?: string | null
          has_monthly_tracking?: boolean | null
          id?: string
          notes?: string | null
          progress?: number | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          completed?: boolean | null
          completed_date?: string | null
          created_at?: string
          description?: string | null
          has_monthly_tracking?: boolean | null
          id?: string
          notes?: string | null
          progress?: number | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      habit_checkins: {
        Row: {
          completed: boolean | null
          created_at: string
          date: string
          habit_id: string
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          date: string
          habit_id: string
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          date?: string
          habit_id?: string
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habit_checkins_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      habits: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string
          description: string | null
          frequency: string
          frequency_days: number[] | null
          id: string
          name: string
          time_of_day: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string
          description?: string | null
          frequency?: string
          frequency_days?: number[] | null
          id?: string
          name: string
          time_of_day?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string
          description?: string | null
          frequency?: string
          frequency_days?: number[] | null
          id?: string
          name?: string
          time_of_day?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mood_logs: {
        Row: {
          created_at: string
          date: string
          energy_level: number | null
          id: string
          mood_score: number
          notes: string | null
          stress_level: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          energy_level?: number | null
          id?: string
          mood_score: number
          notes?: string | null
          stress_level?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          energy_level?: number | null
          id?: string
          mood_score?: number
          notes?: string | null
          stress_level?: number | null
          user_id?: string
        }
        Relationships: []
      }
      phase_exercises: {
        Row: {
          created_at: string
          day_of_week: number | null
          exercise_id: string
          id: string
          notes: string | null
          order_index: number | null
          phase_id: string
          reps: string | null
          rpe_target: number | null
          sets: number | null
          user_id: string
          weight_target: string | null
        }
        Insert: {
          created_at?: string
          day_of_week?: number | null
          exercise_id: string
          id?: string
          notes?: string | null
          order_index?: number | null
          phase_id: string
          reps?: string | null
          rpe_target?: number | null
          sets?: number | null
          user_id: string
          weight_target?: string | null
        }
        Update: {
          created_at?: string
          day_of_week?: number | null
          exercise_id?: string
          id?: string
          notes?: string | null
          order_index?: number | null
          phase_id?: string
          reps?: string | null
          rpe_target?: number | null
          sets?: number | null
          user_id?: string
          weight_target?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "phase_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "phase_exercises_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "exercise_phases"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      reading_sessions: {
        Row: {
          book_id: string
          created_at: string
          date: string
          id: string
          minutes_read: number | null
          notes: string | null
          pages_read: number | null
          user_id: string
        }
        Insert: {
          book_id: string
          created_at?: string
          date: string
          id?: string
          minutes_read?: number | null
          notes?: string | null
          pages_read?: number | null
          user_id: string
        }
        Update: {
          book_id?: string
          created_at?: string
          date?: string
          id?: string
          minutes_read?: number | null
          notes?: string | null
          pages_read?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_sessions_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_logs: {
        Row: {
          created_at: string
          date: string
          distance_km: number | null
          duration_minutes: number | null
          exercise_id: string | null
          exercise_name: string | null
          id: string
          notes: string | null
          phase_id: string | null
          reps: number | null
          rpe: number | null
          sets: number | null
          user_id: string
          weight: number | null
        }
        Insert: {
          created_at?: string
          date: string
          distance_km?: number | null
          duration_minutes?: number | null
          exercise_id?: string | null
          exercise_name?: string | null
          id?: string
          notes?: string | null
          phase_id?: string | null
          reps?: number | null
          rpe?: number | null
          sets?: number | null
          user_id: string
          weight?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          distance_km?: number | null
          duration_minutes?: number | null
          exercise_id?: string | null
          exercise_name?: string | null
          id?: string
          notes?: string | null
          phase_id?: string | null
          reps?: number | null
          rpe?: number | null
          sets?: number | null
          user_id?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_logs_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_logs_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "exercise_phases"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
