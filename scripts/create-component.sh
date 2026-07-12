#!/bin/bash

NAME=$1

mkdir -p components/ui

cat > components/ui/${NAME}.tsx <<EOF
type ${NAME}Props = {
  children?: React.ReactNode;
};

export default function ${NAME}({ children }: ${NAME}Props) {
  return (
    <div>
      {children}
    </div>
  );
}
EOF

echo "Created components/ui/${NAME}.tsx"
