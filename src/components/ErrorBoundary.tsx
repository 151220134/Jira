import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// https://github.com/bvaughn/react-error-boundary
// type PropsWithChildren<P> = P & { children?: ReactNode | undefined };
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 当子组件抛出异常，这里会接收到并且调用，把error赋给state
  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
