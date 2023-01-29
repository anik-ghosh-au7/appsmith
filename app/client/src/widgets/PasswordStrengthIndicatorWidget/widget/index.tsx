import React from "react";

import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";

import PasswordStrengthIndicatorComponent from "../component";

class PasswordStrengthIndicatorWidget extends BaseWidget<
  PasswordStrengthIndicatorWidgetProps,
  WidgetState
> {
  disableButtonBound: (status: boolean) => void;
  constructor(props: PasswordStrengthIndicatorWidgetProps) {
    super(props);
    this.disableButtonBound = this.disableButton.bind(this);
  }
  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: "General",
        children: [
          {
            propertyName: "value",
            label: "Password",
            helpText: "Password Value",
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            isJSConvertable: false,
          },
        ],
      },
    ];
  }

  static getPropertyPaneStyleConfig() {
    return [];
  }

  static getMetaPropertiesMap(): Record<string, any> {
    return {
      buttonDisabled: undefined,
    };
  }

  disableButton(status: boolean) {
    this.props.updateWidgetMetaProperty("buttonDisabled", status);
  }

  getPageView() {
    const { value } = this.props;
    return (
      <PasswordStrengthIndicatorComponent
        disableButton={this.disableButtonBound}
        value={value}
      />
    );
  }

  static getWidgetType(): string {
    return "PASSWORDSTRENGTHINDICATOR_WIDGET";
  }
}

export interface PasswordStrengthIndicatorWidgetProps extends WidgetProps {
  value: "";
}

export default PasswordStrengthIndicatorWidget;
