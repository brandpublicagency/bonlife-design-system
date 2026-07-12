CREATE TABLE public.kb_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  body_markdown text NOT NULL DEFAULT '',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.kb_sections TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.kb_sections TO authenticated;
GRANT ALL ON public.kb_sections TO service_role;

ALTER TABLE public.kb_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read kb_sections" ON public.kb_sections FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can insert kb_sections" ON public.kb_sections FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update kb_sections" ON public.kb_sections FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete kb_sections" ON public.kb_sections FOR DELETE TO anon, authenticated USING (true);

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER kb_sections_touch_updated_at
  BEFORE UPDATE ON public.kb_sections
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE INDEX kb_sections_order_idx ON public.kb_sections (order_index);