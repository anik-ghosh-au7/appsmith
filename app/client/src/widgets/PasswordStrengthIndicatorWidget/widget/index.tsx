import React from "react";

import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";

import PasswordStrengthIndicatorComponent from "../component";

class PasswordStrengthIndicatorWidget extends BaseWidget<
  PasswordStrengthIndicatorWidgetProps,
  WidgetState
> {
  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: "General",
        children: [
          {
            propertyName: "value",
            label: "Password Value",
            helpText: "Password Strength",
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

  getPageView() {
    const { value } = this.props;
    return <PasswordStrengthIndicatorComponent value={value} />;
  }

  static getWidgetType(): string {
    return "PASSWORDSTRENGTHINDICATOR_WIDGET";
  }
}

export interface PasswordStrengthIndicatorWidgetProps extends WidgetProps {
  value: "";
}

export default PasswordStrengthIndicatorWidget;
