// "use client";

// import { Provider } from "react-redux";

// import { store } from "./redux/store";

// export default function Providers({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     return <Provider store={store}>{children}</Provider>;
// }


"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            {/* PersistGate delays rendering until redux-persist has loaded the saved state */}
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}

