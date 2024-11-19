import ThemeContext from '@config/ThemeContext';
import { useContext, useState } from 'react';
import { View, Text, Pressable, FlatList, LayoutRectangle } from 'react-native';

const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const Dropdown = () => {
  const defaultRectLayout = { height: 0, width: 0, x: 0, y: 0 };

  const { dimensions } = useContext(ThemeContext);

  const [isFocus, setFocus] = useState(true);
  const [buttonLayout, setButtonLayout] = useState<LayoutRectangle>(defaultRectLayout);
  const [listLayout, setListLayout] = useState<LayoutRectangle>(defaultRectLayout);

  return (
    <>
      <Pressable
        onPress={() => setFocus((prevFocus) => !prevFocus)}
        onLayout={(e) => setButtonLayout(e.nativeEvent.layout)}
      >
        <View style={{ backgroundColor: '#eeeeee', width: 'auto', padding: 9 }}>
          <Text>Num List</Text>
          <Text>{JSON.stringify(buttonLayout)}</Text>
        </View>
      </Pressable>
      {isFocus && (
        <Pressable
          style={{
            backgroundColor: '#00000011',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 9,
          }}
          onPress={() => setFocus(false)}
        >
          <FlatList
            style={{
              backgroundColor: '#ffffff',
              maxHeight: dimensions.height / 2,
              position: 'absolute',
              zIndex: 10,
              top: buttonLayout.x + buttonLayout.height + 10,
              left: buttonLayout.y,
              minWidth: buttonLayout.width,
            }}
            onLayout={(e) => setListLayout(e.nativeEvent.layout)}
            data={numList}
            renderItem={({ item }) => <Text style={{}}>{item}</Text>}
            ListFooterComponent={<Text>{JSON.stringify(listLayout)}</Text>}
          />
        </Pressable>
      )}
    </>
  );
};

export default Dropdown;
