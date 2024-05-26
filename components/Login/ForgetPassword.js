/* eslint-disable prettier/prettier */
// Trong component ForgetPassword

import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import axios from "axios";
import { PORT } from "../../utils/api/port";

const ForgetPassword = ({ navigation }) => {
    const [email, setEmail] = useState("luuhoang06102002@gmail.com");
    const [password, setPassword] = useState("1234567@Luu");
    const [confirmPassword, setConfirmPassword] = useState('1234567@Luu');
    console.log(email);
    const handleResetPassword = async () => {
        try {
            // Kiểm tra mật khẩu và mật khẩu xác nhận có khớp nhau hay không
            if (password !== confirmPassword) {
                Alert.alert("Error", "Mật khẩu không khớp");
                return;
            }

            // Gửi yêu cầu đặt lại mật khẩu mới đến máy chủ
            const response = await axios.put(`${PORT}/auth/resetPassword`, {
                email: email, // Sử dụng đối tượng params để truyền email
                password: password, // Truyền mật khẩu mới vào password
                confirmPassword: confirmPassword
            });
            console.log(response);
            // Xử lý phản hồi từ máy chủ
            if (response.data.message === "Reset password success") { // Sử dụng message từ phản hồi để kiểm tra thành công
                Alert.alert("Success", "Đặt lại mật khẩu thành công!");
                // Chuyển hướng người dùng đến màn hình đăng nhập sau khi đặt lại mật khẩu thành công
                navigation.navigate('RegisterOPT', { email });
            } else {
                Alert.alert("Error", "Đặt lại mật khẩu không thành công. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("Error", "Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại sau.");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: 'blue', marginBottom: 10 }}>ĐẶT LẠI MẬT KHẨU</Text>
            <TextInput
                style={{ width: '80%', height: 50, borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={{ width: '80%', height: 50, borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
                placeholder="Nhập mật khẩu mới"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <TextInput
                style={{ width: '80%', height: 50, borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
                placeholder="Nhập lại mật khẩu mới"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry
            />
            <Button title="Đặt lại mật khẩu" onPress={handleResetPassword} />
        </View>
    );
};

export default ForgetPassword;
