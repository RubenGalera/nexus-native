import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import LoginForm from "../components/LoginForm";

export default function LoginView() {
    const router = useRouter();

    const handleLoginSuccess = () => {
        // Redirigir a la app cuando el login es correcto
        router.replace("/inicio");
    };

    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 justify-center items-center px-4 py-8">
                    {/* Logo */}
                    <Text className="font-display text-5xl text-crema mb-10">
                        NEX<Text className="text-oro">U</Text>S
                    </Text>

                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}