import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { useAuth, useAlert } from '@/template';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { colors, spacing, borderRadius, typography } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const { sendOTP, verifyOTPAndLogin, signInWithPassword, operationLoading } = useAuth();
  const { showAlert } = useAlert();
  const colorScheme = useColorScheme();
  const theme = colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async () => {
    if (!email.trim()) {
      showAlert('Erro', 'Por favor, insira seu email');
      return;
    }

    const { error } = await sendOTP(email);
    if (error) {
      showAlert('Erro', error);
      return;
    }

    setOtpSent(true);
    showAlert('Sucesso', 'Código de verificação enviado para seu email');
  };

  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !otp.trim()) {
      showAlert('Erro', 'Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Erro', 'As senhas não coincidem');
      return;
    }

    const { error } = await verifyOTPAndLogin(email, otp, { password });
    if (error) {
      showAlert('Erro', error);
      return;
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showAlert('Erro', 'Preencha email e senha');
      return;
    }

    const { error } = await signInWithPassword(email, password);
    if (error) {
      showAlert('Erro', error);
      return;
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setOtpSent(false);
    setOtp('');
    setConfirmPassword('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {isLogin ? 'Bem-vindo' : 'Criar Conta'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {isLogin
              ? 'Entre para acessar os serviços'
              : 'Cadastre-se para começar'}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface }, styles.cardShadow]}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />

          {!isLogin && (
            <>
              <Input
                label="Confirmar Senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                secureTextEntry
              />

              {!otpSent ? (
                <Button
                  title="Enviar Código de Verificação"
                  onPress={handleSendOTP}
                  loading={operationLoading}
                  fullWidth
                />
              ) : (
                <>
                  <Input
                    label="Código de Verificação"
                    value={otp}
                    onChangeText={setOtp}
                    placeholder="Digite o código de 4 dígitos"
                    keyboardType="numeric"
                  />
                  <Button
                    title="Criar Conta"
                    onPress={handleRegister}
                    loading={operationLoading}
                    fullWidth
                  />
                </>
              )}
            </>
          )}

          {isLogin && (
            <Button
              title="Entrar"
              onPress={handleLogin}
              loading={operationLoading}
              fullWidth
            />
          )}

          <View style={styles.switchContainer}>
            <Text style={[styles.switchText, { color: theme.textSecondary }]}>
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            </Text>
            <Button
              title={isLogin ? 'Cadastrar' : 'Entrar'}
              onPress={toggleMode}
              variant="outline"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.base,
  },
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  switchContainer: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  switchText: {
    textAlign: 'center',
    fontSize: typography.sizes.sm,
  },
});
