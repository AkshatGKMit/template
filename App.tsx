import { useEffect, useState } from 'react';
import { AppState, AppStateStatus, LogBox, Text, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BottomSheet from '@components/bottomSheet';
import Dialog from '@components/dialog';
import Snackbar from '@components/snackBar';
import store, { useAppDispatch } from '@store';
import { switchTheme } from '@store/reducers/theme';
import { ThemeMode } from '@themes';
import { globalStyles } from '@themes/globalStyles';
import { SPLASH_SCREEN_DURATION } from '@constants';
import TextBlock from '@components/textBlock';
import React from 'react';
import { recursiveHtml1 } from '@utility/htmlHelpers';

const html = `<p>Honestly, this is one of the plots in the story that I really disliked and made me look at Trevor a little differently, because Floyd never hurt Trevor, <b>agreed to let him and Wade </b>just stay with him in his girlfriend&#8217;s apartment for a long time whilst knowing Debra wouldn&#8217;t like visitors and she would be really angry at him if she found out. Besides, even if Debra was definitely not very nice I still don&#8217;t think she deserved to be killed as she was rightfully probably freaked out by Trevor just bursting into their appartement and causing a scene. It was just super unnecessary imo, and especially twisted because Trevor lied to Wade and had him believe Floyd and Debra were still alive afterwards. Not to mention that it&#8217;s implied multiple times that Trevor did some disturbing things to Floyd whilst staying with him initially.</p><p>I know Trevor is an unhinged character and he&#8217;s done worse things, but this just really put me off for some reason. Besides, I really liked the Vespucci Beach condo as a safehouse for the location and especially the interior, and I wish we could have kept it instead of having Trevor suddenly move to the Vanilla Unicorn and now have an office as a second safehouse (how random). But regardless, I wish he at least didn&#8217;t kill Floyd and Debra. (even if it&#8217;s implied on the in-game news it was actually Debra that shot Floyd and Trevor proceeded to kill her afterwards interestingly, but it still escalated because of Trevor just bursting in)</p><p>I know it&#8217;s unlikely Floyd and Debra would have let Trevor and Wade stay with them forever, but idk they could have at least found something that didn&#8217;t end in their death. Trevor could have simply picked up Wade and took him to the Vanilla Unicorn without that entire confrontation or maybe magically Floyd and/or Debra would have a change of heart if Trevor proved himself to be a reliable housemate to them.</p><p>What are your thoughts on this mission? Do you agree? Or did you think this actually fitted Trevor&#8217;s character?</p>`;

const recursiveHtml = (text: string) => {
  const checkPattern = text.match(/<\/?[a-zA-Z]>/);

  if (!checkPattern) return text;

  const tagWrapper = text.split(/<\/?[a-zA-Z]>/).filter((tag) => tag.trim() !== '');

  return tagWrapper.map((para, index) => {
    const newRecursive = recursiveHtml(para);
    return <TextBlock key={index}>{newRecursive}</TextBlock>;
  });
};

const htmlToComponent = () => {
  const Component = <></>;
  const paragraphs = html.split(/<\/?p>/).filter((p) => p.trim() !== '');

  return paragraphs.map((para, index) => <TextBlock key={index}>{para}</TextBlock>);
};
const htmlToRNComponent = () => {
  const createElement = (tag, children, attributes = {}) => {
    // Map HTML tags to React components and their specific attributes
    const tagMap = {
      p: { component: 'TextBlock', attributes: {} },
      br: { component: 'TextBlock', attributes: { fontWeight: '700' } },
      strong: { component: 'TextBlock', attributes: { fontWeight: '900' } },
      // Add more tags and their specific attributes as needed
    };

    const TagInfo = tagMap[tag] || { component: 'Text', attributes: {} }; // Default to span if tag not found
    const component = React.createElement(
      TagInfo.component,
      { ...TagInfo.attributes, ...attributes },
      children,
    );

    // console.log(component);

    return component;
  };

  const parseHTML = (htmlString: string) => {
    const regex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    let lastIndex = 0;
    const elements = [];

    htmlString.replace(regex, (match, tagName, offset) => {
      if (offset > lastIndex) {
        elements.push(htmlString.slice(lastIndex, offset));
      }

      // Create a new element for the tag with any additional attributes
      elements.push(createElement(tagName, 'Hello')); // Example of adding a class

      lastIndex = offset + match.length;

      return match; // Return match for further processing
    });

    // Push any remaining text after the last tag
    if (lastIndex < htmlString.length) {
      elements.push(htmlString.slice(lastIndex));
    }

    // console.log(elements);

    return elements;
  };

  const parsedElements = parseHTML(html);

  return <>{parsedElements.map((element, index) => element)}</>;
};

const App = () => {
  const queryClient = new QueryClient();

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Main />
          <BottomSheet />
          <Snackbar />
          <Dialog />
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
};

const Main = () => {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  const [showSplash, setShowSplash] = useState(true);

  function onAppStateChange(status: AppStateStatus) {
    focusManager.setFocused(status === 'active');
  }

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, SPLASH_SCREEN_DURATION);

    const appStateSubscription = AppState.addEventListener('change', onAppStateChange);

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme]);

  return (
    <View style={globalStyles.flex1}>
      {/* <NavigationContainer>{showSplash ? <Splash /> : <Navigator />}</NavigationContainer> */}
      <TextBlock>
        {recursiveHtml1(
          '<p>Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. <br />\nSimultaneous storytelling from three unique perspectives: <br />\nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. <br />\nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.</p>\n<p>Español<br />\nRockstar Games se hizo más grande desde su entrega anterior de la serie. Obtienes la construcción del mundo complicada y realista de Liberty City de GTA4 en el escenario de Los Santos, un viejo favorito de los fans, GTA San Andreas. 561 vehículos diferentes (incluidos todos los transportes que puede operar) y la cantidad aumenta con cada actualización.<br />\nNarración simultánea desde tres perspectivas únicas:<br />\nSigue a Michael, ex-criminal que vive su vida de ocio lejos del pasado, Franklin, un niño que busca un futuro mejor, y Trevor, el pasado exacto del que Michael está tratando de huir.<br />\nGTA Online proporcionará muchos desafíos adicionales incluso para los jugadores experimentados, recién llegados del modo historia. Ahora tendrás otros jugadores cerca que pueden ayudarte con la misma probabilidad que arruinar tu misión. Los jugadores pueden experimentar todas las mecánicas de GTA actualizadas a través del personaje personalizable único, y el contenido de la comunidad combinado con el sistema de nivelación tiende a mantener a todos ocupados y comprometidos.</p>',
        )}
      </TextBlock>
    </View>
  );
};

export default App;
