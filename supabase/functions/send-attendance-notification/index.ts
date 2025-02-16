
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const supabase = createClient(supabaseUrl!, supabaseKey!);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { studentId, date } = await req.json();

    // Get student and notification settings
    const { data: student } = await supabase
      .from("students")
      .select("*, email_notifications(*)")
      .eq("id", studentId)
      .single();

    if (!student || !student.email_notifications?.[0]?.email) {
      return new Response(
        JSON.stringify({ error: "No notification settings found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailResponse = await resend.emails.send({
      from: "Attendance System <onboarding@resend.dev>",
      to: [student.email_notifications[0].email],
      subject: `Attendance Notification - ${student.first_name} ${student.last_name}`,
      html: `
        <h1>Attendance Notification</h1>
        <p>This is to inform you that ${student.first_name} ${student.last_name} was marked as absent on ${date}.</p>
        <p>Please contact the school administration for any questions.</p>
      `,
    });

    return new Response(JSON.stringify(emailResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
