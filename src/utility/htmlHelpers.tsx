import { Text } from 'react-native';

export const recursiveHtml1 = (html: string) => {
  // Function to parse HTML string into React components
  const parseHtml = (text: string) => {
    // console.log(text);

    if (!text) return '';

    // Regular expression to match opening and closing tags
    const tagPattern = /(<.*?[a-zA-Z0-9].*?>)/;
    const parts = text.split(tagPattern).filter(Boolean);

    return parts.map((part, index) => {
      const match = part.match(/^<\/?([a-zA-Z][a-zA-Z0-9]*)\s*([^>]*)?>$/);
      if (match) {
        const tagName = match[0].toLowerCase();

        const attributes = match[2] ? parseAttributes(match[2]) : {};

        // Return a component based on the tag name
        switch (tagName) {
          case '<p>':
            return (
              <Text
                key={index}
                style={{ marginVertical: 4 }}
              >
                {parseHtml(parts[index + 1]) + '\n'}
              </Text>
            );
          case '<b>':
            return (
              <Text
                key={index}
                style={{ fontWeight: '800', backgroundColor: 'red' }}
              >
                {parseHtml(parts[index + 1]) + '\n'}
              </Text>
            );
          case '<br />':
            return '\n';
          // Add more cases for other tags as needed
          default:
            return null; // Unknown tags can be ignored or handled differently
        }
      } else {
        // Return text nodes directly
        return <Text key={index}>{part}</Text>;
      }
    });
  };

  // Helper function to parse attributes (if needed)
  const parseAttributes = (attrString: string) => {
    const attrs: any = {};
    attrString
      .trim()
      .split(/\s+/)
      .forEach((attr) => {
        const [key, value] = attr.split('=');
        attrs[key] = value ? value.replace(/['"]/g, '') : true;
      });
    return attrs;
  };

  return <>{parseHtml(html)}</>;
};
