import { createClient } from '@supabase/supabase-js';

// Obtenemos las credenciales desde las variables de entorno
const supabaseUrl = "https://ltguioijgdzhijcoaicy.supabase.co";
const supabaseKey = "sb_publishable_iqblZ4wS3JIMyH-J3PPWWQ_mNlXh9jt";

// Inicializamos y exportamos el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);