import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

interface IBGEUFResponse {
  sigla: string;
}

interface IUfs {
  label: string;
  value: string;
}

interface IBGECityResponse {
  nome: string;
}

interface ICity {
  label: string;
  value: string;
}

export default function Home() {
  const [ufs, setUfs] = useState<IUfs[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigation = useNavigation();

  function handleNavigateToPoints() {
    if (!selectedCity || !selectedUf) {
      Alert.alert("Opssss", "Selecione um estado e uma cidade para prosseguir");
      return;
    }
    navigation.navigate("Points", {
      city: selectedCity,
      uf: selectedUf,
    });
  }

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => {
          return {
            label: uf.sigla,
            value: uf.sigla,
          };
        });
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => {
          return {
            label: city.nome,
            value: city.nome,
          };
        });
        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectedUf(uf: string) {
    setSelectedUf(uf);
  }

  function handleSelectedCity(city: string) {
    setSelectedCity(city);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={require("../../assets/home-background.png")}
        imageStyle={{ width: 274, height: 368 }}
        style={styles.container}
      >
        <View style={styles.main}>
          <Image source={require("../../assets/logo.png")} />
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.select}>
            <RNPickerSelect
              itemKey="uf"
              onValueChange={handleSelectedUf}
              placeholder={{ label: "Selecione o Estado" }}
              value={selectedUf}
              items={ufs}
              style={pickerSelectStyles}
            />
          </View>
          <View style={styles.select}>
            <RNPickerSelect
              itemKey="city"
              style={pickerSelectStyles}
              onValueChange={handleSelectedCity}
              placeholder={{ label: "Selecione a cidade" }}
              value={selectedCity}
              items={cities}
            />
          </View>
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  select: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    paddingVertical: 8,
    paddingRight: 30,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: "black",
    fontFamily: "Roboto_400Regular",
  },
  inputAndroid: {
    color: "black",
    fontFamily: "Roboto_400Regular",
  },
});
