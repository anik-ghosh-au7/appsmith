import React from "react";
import styled, { css } from "styled-components";
import { Colors } from "constants/Colors";

interface PasswordStrengthProps {
  strength: string;
}

interface PropTypes {
  value: string;
  disableButton: (arg0: boolean) => void;
}

type FlexProps = {
  wrap?: string;
  alignItems?: string;
  flexDirection?: string;
  isResponsive?: boolean;
  justifyContent?: string;
  height?: string;
  width?: string;
};

const StyledHeader = styled.p`
  margin-bottom: 5px;
`;

const StyledCheckBoxLabel = styled.div`
  margin-left: 5px;
`;

const PasswordStrengthWrapper = styled.div`
  margin: 2% 0 2.5%;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection, isResponsive }: FlexProps) =>
    isResponsive && flexDirection !== "column"
      ? "column"
      : flexDirection || "row"};
  flex-wrap: ${({ wrap }: FlexProps) => wrap || "wrap"};
  ${({ alignItems }) =>
    alignItems &&
    css`
      align-items: ${alignItems};
    `};
  ${({ justifyContent }: FlexProps) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `};
`;

const passwordStrengthIndicatorOpacity: Record<string, number> = {
  default: 0.15,
  weak: 0.4,
  good: 0.6,
  strong: 0.8,
  veryStrong: 1,
};

const PasswordStrength = styled.div`
  width: 100%;
  height: 10px;
  flex: 0.75;
  border-radius: 5px;
  margin-right: 5px;
  background-color: ${Colors.AZURE_RADIANCE};
  opacity: ${(props: PasswordStrengthProps) =>
    passwordStrengthIndicatorOpacity[props.strength]};
`;

const hasSpecialChar = (char: string): boolean => {
  const re = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return re.test(char);
};

const validatePassword = (
  value: string,
): {
  score: number;
  strength: string;
  hasSixChar: boolean;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasNumericChar: boolean;
  hasSpecialChar: boolean;
  maxThirtySixChar: boolean;
  isValid: boolean;
} => {
  const res = {
    score: 0,
    strength: "",
    hasSixChar: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumericChar: false,
    hasSpecialChar: false,
    maxThirtySixChar: false,
  };

  if (value.length >= 6) {
    res.score = res.score + 1;
    res.hasSixChar = true;
  }

  if (value.length > 0 && value.length <= 36) {
    res.score = res.score + 1;
    res.maxThirtySixChar = true;
  }

  Array.from(value).forEach((char: any) => {
    if (char >= "A" && char <= "Z" && !res.hasUpperCase) {
      res.score = res.score + 1;
      res.hasUpperCase = true;
    } else if (char >= "a" && char <= "z" && !res.hasLowerCase) {
      res.score = res.score + 1;
      res.hasLowerCase = true;
    } else if (char >= "0" && char <= "9" && !res.hasNumericChar) {
      res.score = res.score + 1;
      res.hasNumericChar = true;
    } else if (hasSpecialChar(char) && !res.hasSpecialChar) {
      res.score = res.score + 1;
      res.hasSpecialChar = true;
    }
  });

  if (res.score <= 2) {
    res.strength = "Weak";
  } else if (res.score <= 4) {
    res.strength = "Good";
  } else if (res.score <= 5) {
    res.strength = "Strong";
  } else {
    res.strength = "Very Strong";
  }

  const isValid = Object.values(res).every((i) => Boolean(i));
  return { ...res, isValid };
};

const PasswordStrengthIndicator = ({ disableButton, value }: PropTypes) => {
  const [
    {
      hasLowerCase,
      hasNumericChar,
      hasSixChar,
      hasSpecialChar,
      hasUpperCase,
      maxThirtySixChar,
      score,
      strength,
    },
    setValidations,
  ] = React.useState({ ...validatePassword(value || "") });

  React.useEffect(() => {
    const validationData = validatePassword(value || "");
    setValidations({ ...validationData });
    if (!validationData.isValid) {
      disableButton(true);
    } else {
      disableButton(false);
    }
  }, [value]);

  return (
    <div>
      <PasswordStrengthWrapper>
        <Flex alignItems="center" justifyContent="center" wrap="nowrap">
          <PasswordStrength strength={score > 2 ? `weak` : `default`} />
          <PasswordStrength strength={score > 3 ? `good` : `default`} />
          <PasswordStrength strength={score > 4 ? `strong` : `default`} />
          <PasswordStrength strength={score > 5 ? `veryStrong` : `default`} />
          {!!score && <div>{strength}</div>}
        </Flex>
      </PasswordStrengthWrapper>
      <StyledHeader>
        <b>Criteria for a strong password:</b>
      </StyledHeader>
      <Flex flexDirection="column">
        <Flex alignItems="center" justifyContent="start">
          <input checked={hasSixChar} readOnly type="checkbox" />
          <StyledCheckBoxLabel>At least 6 characters</StyledCheckBoxLabel>
        </Flex>
        <Flex alignItems="center" justifyContent="start">
          <input checked={hasLowerCase} readOnly type="checkbox" />
          <StyledCheckBoxLabel>At least 1 lowercase letter</StyledCheckBoxLabel>
        </Flex>
        <Flex alignItems="center" justifyContent="start">
          <input checked={hasUpperCase} readOnly type="checkbox" />
          <StyledCheckBoxLabel>At least 1 uppercase letter</StyledCheckBoxLabel>
        </Flex>
        <Flex alignItems="center" justifyContent="start">
          <input checked={hasNumericChar} readOnly type="checkbox" />
          <StyledCheckBoxLabel>
            At least 1 numeric character
          </StyledCheckBoxLabel>
        </Flex>
        <Flex alignItems="center" justifyContent="start">
          <input checked={hasSpecialChar} readOnly type="checkbox" />
          <StyledCheckBoxLabel>
            At least 1 special character
          </StyledCheckBoxLabel>
        </Flex>
        <Flex alignItems="center" justifyContent="start">
          <input checked={maxThirtySixChar} readOnly type="checkbox" />
          <StyledCheckBoxLabel>Maximum 36 characters</StyledCheckBoxLabel>
        </Flex>
      </Flex>
    </div>
  );
};

export default PasswordStrengthIndicator;
