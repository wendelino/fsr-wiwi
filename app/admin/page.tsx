import { AdminLogin } from "@/components/RegisterForm";
import { Header } from "@/components/TextComponents";

export default function page() {
    return (
        <>
            <Header className="text-center">Admin-Bereich</Header>

            <AdminLogin/>
            
        </>
    );
}