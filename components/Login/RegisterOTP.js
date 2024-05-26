
import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { PORT } from '../../utils/api/port';

const RegisterOTP = ({ route, navigation }) => {
    const [otp, setOTP] = useState('');


    const handleVerifyOTP = async () => {
        const { email } = route.params;
        try {
            const response = await axios.post(`${PORT}/auth/verify`, { otp, email });
            console.log(response);
            Alert.alert('Success', 'OTP đăng kí thành công.');
            navigation.navigate('Login'); // Chuyển đến màn hình đăng nhập sau khi OTP được xác thực thành công

        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'lỗi OTP! vui lòng nhập lại.');
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '80%', alignItems: 'center' }}>
                <Image source={require('../../assets/chatchit.png')} style={{ width: 90, height: 60, marginTop: 20 }} />
                <Text style={{ fontSize: 20, fontWeight: '900', marginTop: 40, color: 'black' }}>Nhập mã xác thực</Text>
                <View style={{ marginTop: 30, width: '100%', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '900', marginBottom: 15 }}>Nhập mã OTP:</Text>
                    <TextInput
                        style={{ width: '80%', height: 40, borderWidth: 1 }}
                        onChangeText={(text) => setOTP(text)}
                        keyboardType="numeric"
                        maxLength={6} // Giới hạn độ dài của OTP là 6 ký tự
                    />
                </View>
                <TouchableOpacity onPress={handleVerifyOTP} style={{ width: 180, height: 40, borderRadius: 15, backgroundColor: "blue", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                    <Text style={{ fontSize: 20, color: "white" }}>Xác thực OTP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegisterOTP;