import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

// export enum ButtonSize {
//   Large = 'lg',
//   Small = 'sm'
// }

// export enum ButtonType {
//   Primary = 'primary',
//   Default = 'default',
//   Danger = 'danger',
//   Link = 'link'
// }

// 将enum改成字符串字面量，节省编写时间
export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children?: React.ReactNode;
  href?: string;
}

/**
 * 1. 添加 Button 或者 a 链接原本自身的Native属性，如 a 链接的 target="_blank, onClick 等等；
 * 2. 交叉类型(Intersection Types): 通过 & 将多个类型合成一个类型
 * 3. 通过 type 对属性起别名
 */
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

/**
 * 针对 Button 或者 a 链接，可能各自存在某些属性是必须的，所以需将所有属性设置成可选。
 * 可以通过 Partial 将所有属性设置成可选。
 */
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

// react-docgen插件要求Button组件还需通过export方式导出
export const Button: FC<ButtonProps> = props => {
  const {
    btnType,
    // 添加用户自定义的className
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props;

  const cls = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled
  });

  if (btnType === 'link' && href) {
    return (
      <a className={cls} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={cls} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
};

export default Button;
