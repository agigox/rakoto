import React from 'react';
import * as icons from 'react-bootstrap-icons';

interface IconProps extends icons.IconProps {
  iconName: keyof typeof icons;
}

export const Icon: React.FC<IconProps> = ({
  iconName,
  ...props
}: IconProps) => {
  const BootstrapIcon = icons[iconName];
  return <BootstrapIcon {...props} />;
};
