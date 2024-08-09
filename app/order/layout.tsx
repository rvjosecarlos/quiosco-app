import ToastNotification from "@/components/UI/ToastNotification";
import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className="md:flex">
                <OrderSidebar />
                <main 
                    className="md:flex-1 md:h-screen md:overflow-y-scroll p-5"
                    style={{ scrollbarWidth: "thin" }}
                >
                    { children }
                </main>
                <OrderSummary />
                <ToastNotification />
            </div>
        </>
    );
  };