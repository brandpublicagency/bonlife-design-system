ALTER TABLE public.kb_sections
  ADD COLUMN parent_id uuid NULL REFERENCES public.kb_sections(id) ON DELETE CASCADE,
  ADD COLUMN sibling_order integer NOT NULL DEFAULT 0;

UPDATE public.kb_sections
SET sibling_order = order_index
WHERE parent_id IS NULL;

CREATE INDEX kb_sections_parent_order_idx
  ON public.kb_sections (parent_id, sibling_order);

CREATE OR REPLACE FUNCTION public.validate_kb_section_parent()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.parent_id = NEW.id THEN
    RAISE EXCEPTION 'A knowledge base section cannot be its own parent';
  END IF;

  IF NEW.parent_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.kb_sections parent
    WHERE parent.id = NEW.parent_id AND parent.parent_id IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'Knowledge base sections support one child level only';
  END IF;

  IF NEW.parent_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.kb_sections child
    WHERE child.parent_id = NEW.id
  ) THEN
    RAISE EXCEPTION 'A parent section cannot also be a child section';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_kb_section_parent_before_write
  BEFORE INSERT OR UPDATE OF parent_id ON public.kb_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_kb_section_parent();

REVOKE ALL ON FUNCTION public.validate_kb_section_parent() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.validate_kb_section_parent() TO service_role;