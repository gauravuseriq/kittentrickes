import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ComponentsScreen } from "../scenes/components/components.component";
import { AutocompleteScreen } from "../scenes/components/autocomplete/autocomplete.component";
import { AvatarScreen } from "../scenes/components/avatar/avatar.component";
import { BottomNavigationScreen } from "../scenes/components/bottom-navigation/bottom-navigation.component";
import { ButtonScreen } from "../scenes/components/button/button.component";
import { ButtonGroupScreen } from "../scenes/components/button-group/button-group.component";
import { CalendarScreen } from "../scenes/components/calendar/calendar.component";
import { CardScreen } from "../scenes/components/card/card.component";
import { CheckBoxScreen } from "../scenes/components/checkbox/checkbox.component";
import { DatepickerScreen } from "../scenes/components/datepicker/datepicker.component";
import { DrawerScreen } from "../scenes/components/drawer/drawer.component";
import { IconScreen } from "../scenes/components/icon/icon.component";
import { InputScreen } from "../scenes/components/input/input.component";
import { LayoutScreen } from "../scenes/components/layout/layout.component";
import { ListScreen } from "../scenes/components/list/list.component";
import { MenuScreen } from "../scenes/components/menu/menu.component";
import { ModalScreen } from "../scenes/components/modal/modal.component";
import { OverflowMenuScreen } from "../scenes/components/overflow-menu/overflow-menu.component";
import { PopoverScreen } from "../scenes/components/popover/popover.component";
import { RadioScreen } from "../scenes/components/radio/radio.component";
import { RadioGroupScreen } from "../scenes/components/radio-group/radio-group.component";
import { RangeCalendarScreen } from "../scenes/components/range-calendar/range-calendar.component";
import { RangeDatepickerScreen } from "../scenes/components/range-datepicker/range-datepicker.component";
import { SelectScreen } from "../scenes/components/select/select.component";
import { SpinnerScreen } from "../scenes/components/spinner/spinner.component";
import { TabViewScreen } from "../scenes/components/tab-view/tab-view.component";
import { TextScreen } from "../scenes/components/text/text.component";
import { ToggleScreen } from "../scenes/components/toggle/toggle.component";
import { TooltipScreen } from "../scenes/components/tooltip/tooltip.component";
import { TopNavigationScreen } from "../scenes/components/top-navigation/top-navigation.component";

import AsyncStorage from "@react-native-community/async-storage";

import {
  StyleService,
  useStyleSheet,
  Button,
  Layout,
  Input,
  Select,
} from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { ProfileSetting } from "../layouts/social/profile-settings-3/extra/profile-setting.component";
import { Profile } from "../layouts/social/profile-settings-3/extra/data";
import { KeyboardAvoidingView } from "react-native";
import { FlexStyleProps } from "@ui-kitten/components/ui/support/typings";
import { SafeAreaLayout } from "../components/safe-area-layout.component";
import UserIQ from "@useriq/useriq-react-native";

// const Stack = createStackNavigator();
const profile: Profile = Profile.jenniferGreen();

const SELECT_DATA = [{ text: "Production" }, { text: "QA" }];

export const ComponentsNavigator = (): React.ReactElement => {
  // <Stack.Navigator headerMode='none'>
  //   <Stack.Screen name='Components' component={ComponentsScreen}/>
  //   <Stack.Screen name='Autocomplete' component={AutocompleteScreen}/>
  //   <Stack.Screen name='Avatar' component={AvatarScreen}/>
  //   <Stack.Screen name='BottomNavigation' component={BottomNavigationScreen}/>
  //   <Stack.Screen name='Button' component={ButtonScreen}/>
  //   <Stack.Screen name='ButtonGroup' component={ButtonGroupScreen}/>
  //   <Stack.Screen name='Calendar' component={CalendarScreen}/>
  //   <Stack.Screen name='Card' component={CardScreen}/>
  //   <Stack.Screen name='CheckBox' component={CheckBoxScreen}/>
  //   <Stack.Screen name='Datepicker' component={DatepickerScreen}/>
  //   <Stack.Screen name='Drawer' component={DrawerScreen}/>
  //   <Stack.Screen name='Icon' component={IconScreen}/>
  //   <Stack.Screen name='Input' component={InputScreen}/>
  //   <Stack.Screen name='Layout' component={LayoutScreen}/>
  //   <Stack.Screen name='List' component={ListScreen}/>
  //   <Stack.Screen name='Menu' component={MenuScreen}/>
  //   <Stack.Screen name='Modal' component={ModalScreen}/>
  //   <Stack.Screen name='OverflowMenu' component={OverflowMenuScreen}/>
  //   <Stack.Screen name='Popover' component={PopoverScreen}/>
  //   <Stack.Screen name='Radio' component={RadioScreen}/>
  //   <Stack.Screen name='RadioGroup' component={RadioGroupScreen}/>
  //   <Stack.Screen name='RangeCalendar' component={RangeCalendarScreen}/>
  //   <Stack.Screen name='RangeDatepicker' component={RangeDatepickerScreen}/>
  //   <Stack.Screen name='Select' component={SelectScreen}/>
  //   <Stack.Screen name='Spinner' component={SpinnerScreen}/>
  //   <Stack.Screen name='TabView' component={TabViewScreen}/>
  //   <Stack.Screen name='Text' component={TextScreen}/>
  //   <Stack.Screen name='Toggle' component={ToggleScreen}/>
  //   <Stack.Screen name='Tooltip' component={TooltipScreen}/>
  //   <Stack.Screen name='TopNavigation' component={TopNavigationScreen}/>
  // </Stack.Navigator>

  /**
   * id = 12345
   * name = gaurav
   * email = gaurav.sharma@useriq.com
   * accountId = 12345
   * accountName = grvsharma
   *
   * apiId = 5b6e97aa2da54060c422727a40a8fda8e7cf9652
   */

  const styles = useStyleSheet(themedStyles);

  const [notFirstTime, setNotFirstTime] = React.useState<boolean>(false);
  // const [appInit, setAppInit] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] = React.useState(null);

  const [apiId, setApiId] = React.useState<string>("");

  const [id, setId] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [accountId, setAccountId] = React.useState<string>("");
  const [accountName, setAccountName] = React.useState<string>("");

  React.useEffect(() => {
    try {
      AsyncStorage.getItem("userCredentials").then((userCredentials) => {
        let {
          id = "",
          name = "",
          email = "",
          accountId = "",
          accountName = "",
        } = userCredentials ? JSON.parse(userCredentials) : {};

        if (id) setId(id);
        if (name) setName(name);
        if (email) setEmail(email);
        if (accountId) setAccountId(accountId);
        if (accountName) setAccountName(accountName);
      });

      AsyncStorage.getItem("apiId").then((apiId) => {
        if (apiId) setApiId(apiId);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const setNewUser = async () => {
    if (notFirstTime) UserIQ.logOut();

    const userObj = { id, name, email, accountId, accountName };

    UserIQ.setUser({
      ...userObj,
      signUpDate: "15-06-1995",
      custom_parameter_1: "custom_value_1",
      custom_parameter_2: "custom_value_2",
    });
    setNotFirstTime(true);

    try {
      const objAsString = JSON.stringify(userObj);
      await AsyncStorage.setItem("userCredentials", objAsString);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  };

  const initApp = async () => {
    if (selectedOption && selectedOption.text == "QA") {
      UserIQ.setHost("qa-mobile");
    }

    UserIQ.init(apiId);

    try {
      await AsyncStorage.setItem("apiId", apiId);
    } catch (error) {
      console.log("Error saving data" + error);
    }

    // setAppInit(true);
  };

  return (
    <SafeAreaLayout style={styles.safeArea} insets="top">
      {/* <TopNavigation
        title="Product Details"
        leftControl={renderBackAction()}
        rightControls={[renderBookmarkAction()]}
      /> */}
      <ScrollView
        style={styles.container}
        removeClippedSubviews={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Layout style={styles.form} level="1">
          <Select
            data={SELECT_DATA}
            selectedOption={selectedOption}
            onSelect={(value) => setSelectedOption(value)}
            onFocus={() => {}}
            onBlur={() => {}}
          />

          <Input
            style={styles.input}
            label="API Key"
            placeholder="API Key"
            value={apiId}
            accessibilityLabel="API Key"
            onChangeText={setApiId}
          />

          <Button style={styles.doneButton} size="giant" onPress={initApp}>
            Init SDK
          </Button>
        </Layout>

        <ProfileSetting
          style={[styles.setting, styles.section]}
          hint="User ID"
          value={id}
        />
        <ProfileSetting style={styles.setting} hint="User Name" value={name} />
        <ProfileSetting
          style={styles.setting}
          hint="User Email"
          value={email}
        />
        <ProfileSetting
          style={styles.setting}
          hint="User Account Id"
          value={accountId}
        />
        <ProfileSetting
          style={styles.setting}
          hint="User Account Name"
          value={accountName}
        />

        <Layout style={styles.form} level="1">
          <Input
            style={styles.input}
            label="User ID"
            placeholder="User ID"
            value={id}
            accessibilityLabel="User ID"
            onChangeText={setId}
          />

          <Input
            style={styles.input}
            label="User Name"
            placeholder="User Name"
            value={name}
            accessibilityLabel="User Name"
            onChangeText={setName}
          />

          <Input
            style={styles.input}
            label="User Email"
            placeholder="User Email"
            value={email}
            accessibilityLabel="User Email"
            onChangeText={setEmail}
          />

          <Input
            style={styles.input}
            label="User Account Id"
            placeholder="User Account Id"
            accessibilityLabel="User Account Id"
            value={accountId}
            onChangeText={setAccountId}
          />

          <Input
            style={styles.input}
            label="User Account Name"
            accessibilityLabel="User Account Name"
            placeholder="User Account Name"
            value={accountName}
            onChangeText={setAccountName}
          />
        </Layout>
      </ScrollView>
      <Button style={styles.doneButton} size="giant" onPress={setNewUser}>
        Update User Credentials
      </Button>
    </SafeAreaLayout>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
  container: {
    backgroundColor: "background-basic-color-2",
  },
  contentContainer: {
    paddingVertical: 24,
    backgroundColor: "background-basic-color-2",
  },
  photo: {
    alignSelf: "center",
    width: 320,
    height: 320,
    borderRadius: 16,
  },
  photoButton: {
    right: 16,
    top: 32,
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  description: {
    padding: 24,
    backgroundColor: "background-basic-color-1",
  },
  setting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  form: {
    // flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 24,
  },
  input: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  middleContainer: {
    flexDirection: "row",
  },
  middleInput: {
    width: 128,
  },
});
