import { Colors } from "constants/Colors";
import { ValidationTypes } from "constants/WidgetValidation";
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
    return [
      {
        sectionName: "Color",
        children: [
          {
            propertyName: "indicatorColor",
            label: "Indicator Color",
            helpText: "Indicator Color Value",
            controlType: "COLOR_PICKER",
            isBindProperty: true,
            isTriggerProperty: false,
            isJSConvertable: true,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
                default: Colors.AZURE_RADIANCE,
              },
            },
          },
        ],
      },
    ];
  }

  static getMetaPropertiesMap(): Record<string, boolean> {
    return {
      buttonDisabled: true,
    };
  }

  disableButton(status: boolean) {
    this.props.updateWidgetMetaProperty("buttonDisabled", status);
  }

  getPageView() {
    const { indicatorColor, value } = this.props;
    return (
      <PasswordStrengthIndicatorComponent
        disableButton={this.disableButtonBound}
        indicatorColor={indicatorColor}
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
