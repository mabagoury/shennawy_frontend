import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Shennawy",
  description: "Find your home",
};

export default function ApartmentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  );
}
