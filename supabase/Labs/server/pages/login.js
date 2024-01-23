import { Auth } from '@supabase/auth-ui-react';
import { createClient } from '@supabase/supabase-js';

const LoginPage = () => {
    const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)

    const customTheme = {
        default: {
            colors: {
                brandButtonText: 'white',
                defaultButtonBackground: '#2e2e2e',
                defaultButtonBackgroundHover: '#3e3e3e',
            },
        },
    }

    return(
            <>
                <Auth
                    supabaseClient={supabase}
                    providers={['github']}
                    theme="default"
                    appearance={{ theme: customTheme }}
                    onlyThirdPartyProviders
                />
        </>
    )
}
export default LoginPage