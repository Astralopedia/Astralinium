'use server'

import { createClient } from "@/utils/supabase/client"

export default async function getNameById(id: string) {
    const supabase = createClient()
	
    return ((await supabase.from("profiles").select().eq("id", id)).data as any[])[0].display_name
}
