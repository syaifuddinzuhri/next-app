"use client"
import "flatpickr/dist/themes/light.css";
import "leaflet/dist/leaflet.css";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "simplebar-react/dist/simplebar.min.css";
import store from "../store";
import "./scss/app.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className="font-inter  custom-tippy dashcode-app">
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}
          </Provider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
        <ToastContainer />

      </body>
    </html>
  )
}
