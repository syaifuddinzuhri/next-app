import React from "react";

export const withProviders = (...providers: any[]) => (
    WrappedComponent: React.FC
) => (props: any) =>
        providers.reduceRight((acc, Provider) => {
            return <Provider>{acc}</Provider>;
        }, <WrappedComponent {...props} />);