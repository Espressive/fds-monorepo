import React from 'react';
import pt from 'prop-types';
import Widget, { propTypes as widgetPT } from './Widget';
import { CHART_DEFAULTS, MARGIN_CONFIG } from './widgetConfig';
import { ResponsiveBubble } from '@nivo/circle-packing';

const propTypes = {
  ...widgetPT,
  /** Data to display in a widget */
  data: pt.oneOfType([pt.array, pt.object]).isRequired,
  /** The unique value to index by on `data` */
  indexBy: pt.string,
  /** The value to use for displaying bar labels */
  label: pt.string,
};

/**
 * Widget for displaying list data.
 */
const WidgetBubble = ({ data, indexBy = 'id', label = 'value', ...rest }) => {
  const CHART_CONFIG = {
    ...CHART_DEFAULTS,
    colorBy: indexBy,
    colors: { scheme: CHART_DEFAULTS.colors },
    leavesOnly: true,
    margin: MARGIN_CONFIG,
    padding: 6,
  };

  return (
    <Widget {...rest}>
      <ResponsiveBubble
        {...CHART_CONFIG}
        identity={indexBy}
        root={{ children: data, id: '' }}
        value={label}
      />
    </Widget>
  );
};

WidgetBubble.propTypes = propTypes;
WidgetBubble.displayName = 'bubble';

export { propTypes };

export default WidgetBubble;
