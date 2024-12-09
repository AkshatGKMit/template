import { useMemo } from 'react';
import { FlatList, StyleProp, View, ViewStyle } from 'react-native';

import { globalStyles } from '@themes/globalStyles';
import { generateRandomString } from '@utility/helpers';

const GridItem = ({ width, aspectRatio, children, style }: GridItemProps) => {
  const styles: StyleProp<ViewStyle> = [
    style,
    globalStyles.flex1,
    { maxWidth: `${width}%`, aspectRatio },
  ];

  return <View style={styles}>{children}</View>;
};

const ListEmptyComponent = ({
  aspectRatio,
  columnSpacing,
  itemCount,
  numOfColumns,
  rowSpacing,
  width,
  children,
}: ListEmptyComponentProps) => {
  const fullRows = useMemo(() => Math.ceil(itemCount / numOfColumns), [itemCount, numOfColumns]);
  const remainingItems = useMemo(() => itemCount % numOfColumns, [itemCount, numOfColumns]);

  return (
    <View style={{ gap: rowSpacing, flexDirection: 'column' }}>
      {Array.from({ length: fullRows }).map((_, rowIndex) => {
        const isLastRow = !!remainingItems && rowIndex === fullRows - 1;
        const itemsInRow = isLastRow ? remainingItems : numOfColumns;

        return (
          <View
            key={generateRandomString(rowIndex) + rowIndex}
            style={{ gap: columnSpacing, flexDirection: 'row' }}
          >
            {Array.from({ length: itemsInRow }).map((_, columnIndex) => (
              <GridItem
                key={generateRandomString(columnIndex) + columnIndex}
                width={width}
                aspectRatio={aspectRatio}
              >
                {children}
              </GridItem>
            ))}
            {isLastRow &&
              Array.from({ length: numOfColumns - remainingItems }).map((_, columnIndex) => (
                <GridItem
                  key={generateRandomString(columnIndex) + columnIndex}
                  width={width}
                  aspectRatio={aspectRatio}
                />
              ))}
          </View>
        );
      })}
    </View>
  );
};

const GridView = <T,>(props: GridViewProps<T>) => {
  const {
    data,
    renderItem,
    numOfColumns,
    columnSpacing,
    rowSpacing,
    childAspectRatio,
    itemStyle,
    emptyItemsCount,
    emptyComponent,
    Header,
    Footer,
    onEndReached,
    endThreshold,
  } = props;

  if (numOfColumns < 2) {
    throw new Error('Grid view must contain a minimum of 2 columns.');
  } else if (emptyItemsCount !== undefined && emptyComponent === undefined) {
    throw new Error('If `emptyItemsCount` is provided, `emptyComponent` must also be defined.');
  } else if (emptyItemsCount === undefined && emptyComponent !== undefined) {
    throw new Error('If `emptyComponent` is provided, `emptyItemsCount` must also be defined.');
  }

  const width = useMemo(() => 100 / numOfColumns, [numOfColumns]);

  return (
    <FlatList
      {...props}
      key={numOfColumns}
      numColumns={numOfColumns}
      style={globalStyles.flex1}
      columnWrapperStyle={{ gap: columnSpacing }}
      contentContainerStyle={{ gap: rowSpacing }}
      data={data}
      renderItem={(info) => {
        return (
          <GridItem
            width={width}
            aspectRatio={childAspectRatio}
            style={itemStyle}
          >
            {renderItem(info)}
          </GridItem>
        );
      }}
      ListEmptyComponent={
        <ListEmptyComponent
          itemCount={emptyItemsCount ?? 0}
          numOfColumns={numOfColumns}
          aspectRatio={childAspectRatio}
          columnSpacing={columnSpacing}
          rowSpacing={rowSpacing}
          width={width}
          children={emptyComponent}
        />
      }
      ListHeaderComponent={Header}
      ListFooterComponent={Footer}
      onEndReached={() => onEndReached?.()}
      onEndReachedThreshold={endThreshold}
    />
  );
};

export default GridView;
