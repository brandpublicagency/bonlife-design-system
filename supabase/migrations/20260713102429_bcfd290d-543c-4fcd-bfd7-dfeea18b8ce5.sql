-- Lock down SECURITY DEFINER functions: revoke default PUBLIC/anon execute.
-- has_role is used inside RLS policies for authenticated writers, so keep EXECUTE for authenticated.
-- grant_first_user_admin runs only from an auth trigger; no client role needs EXECUTE.
-- touch_updated_at runs only from table triggers; no client role needs EXECUTE.

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.grant_first_user_admin() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.grant_first_user_admin() TO service_role;

REVOKE ALL ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.touch_updated_at() TO service_role;