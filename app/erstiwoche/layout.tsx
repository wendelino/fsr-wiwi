import { DataProvider } from "@/components/DataContext";

interface LayoutProps {
  children: React.ReactNode;
}
export default async function Layout({ children }: LayoutProps) {
  return <DataProvider>{children}</DataProvider>;
}
