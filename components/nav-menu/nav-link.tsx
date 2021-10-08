import { Text, useBoolean } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MotionBox } from '../motion/motionComponent';

interface NavLinkProps {
  page: string;
  isOpen: boolean;
  isPhone: boolean;
}

function useIsCurrentPage(page: string): boolean {
  const href = useRouter().asPath;
  if (page === 'Home') page = '';
  return `/${page.toLowerCase()}` === href;
}

function NavLink(props: NavLinkProps) {
  const { page, isOpen, isPhone } = props;

  const isCurrentPage = useIsCurrentPage(page);
  const [hovering, setHovering] = useBoolean();

  const linkBoxProps = {
    onMouseEnter: () => setHovering.toggle(),
    onMouseLeave: () => setHovering.toggle(),
    initial: { transformOrigin: 'bottom' },
    animate: {
      transformOrigin: 'bottom',
      scaleY: isOpen || !isPhone ? 1 : [0.9, 0.1, 0],
    },
  };

  const linkTextProps = {
    fontFamily: 'alata, sans-serif',
    fontWeight: '400',
    cursor: isCurrentPage ? 'unset' : 'pointer',
    fontSize: '18px',
    textColor: isOpen || isPhone ? 'black' : 'white',
  };

  const linkUnderlineProps = {
    h: '1px',
    bg: isOpen || isPhone ? 'black' : 'white',
    initial: { transformOrigin: hovering ? 'right' : 'left' },
    animate: {
      transformOrigin: hovering ? 'right' : 'left',
      scaleX: hovering || isCurrentPage ? 1 : 0,
    },
  };

  return (
    <MotionBox {...linkBoxProps}>
      <Link href={page === 'Home' ? '/' : `/${page.toLowerCase()}`}>
        <Text {...linkTextProps}>{page}</Text>
      </Link>
      <MotionBox {...linkUnderlineProps} />
    </MotionBox>
  );
}

export default NavLink;
export type { NavLinkProps };