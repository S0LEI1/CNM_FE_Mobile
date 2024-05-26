// import React, { useState } from "react";
// import {
//     View,
//     TextInput,
//     Text,
//     TouchableOpacity,
//     Image,
//     Alert,
//     ScrollView,
// } from "react-native";
// import axios from "axios";
// import { Sun } from "iconsax-react-native";
// import { PORT } from "../../utils/api/port";

// const RegisterForm = ({ navigation }) => {
//     const [stick, setStick] = useState(false);
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");
//     const [password, setPassword] = useState("");
//     const [name, setName] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");

//     const MAX_RETRY = 3; // Số lần thử lại tối đa
//     let retryCount = 0;

//     const handleRegister = async () => {
//         // Code khác...

//         try {
//             const response = await axios.post(`${PORT}/auth/signup`, {
//                 email,
//                 phoneNumber: phone,
//                 password,
//                 name,
//                 confirmPassword,
//             }, {
//                 timeout: 10000
//             });

//             // Xử lý dữ liệu nhận được...

//         } catch (error) {
//             if (error.code === 'ECONNABORTED') {
//                 if (retryCount < MAX_RETRY) {
//                     // Tăng số lần thử lại và thực hiện lại yêu cầu
//                     retryCount++;
//                     await handleRegister();
//                 } else {
//                     Alert.alert("Error", "Yêu cầu đã vượt quá thời gian chờ, vui lòng thử lại sau");
//                 }
//             } else {
//                 // Xử lý lỗi khác...
//             }
//         }
//     };


//     return (
//         <ScrollView
//             contentContainerStyle={{ flexGrow: 1 }}
//             style={{ backgroundColor: "white" }}
//         >
//             <View
//                 style={{
//                     width: "100%",
//                     height: "100%",
//                     alignItems: "center",
//                     backgroundColor: "white",
//                 }}
//             >
//                 <View
//                     style={{
//                         width: "80%",
//                         height: "100%",
//                         alignItems: "center",
//                         flexDirection: "column",
//                     }}
//                 >
//                     <Image
//                         source={require("../../assets/chatchit.png")}
//                         style={{
//                             width: 90,
//                             height: 70,
//                             backgroundColor: "white",
//                             marginVertical: 20,
//                         }}
//                     />
//                     <View
//                         style={{
//                             width: "100%",
//                             marginVertical: 20,
//                             fontWeight: "800",
//                             justifyContent: "center",
//                             alignItems: "center",
//                         }}
//                     >
//                         <Text style={{ color: "black", fontWeight: "700", fontSize: 25 }}>
//                             Đăng ký tài khoản
//                         </Text>
//                     </View>

//                     <View
//                         style={{
//                             flexDirection: "column",
//                             width: "100%",
//                             color: "black",
//                             marginBottom: 15,
//                         }}
//                     >
//                         <View
//                             style={{
//                                 width: "100%",
//                                 alignItems: "center",
//                                 flexDirection: "row",
//                             }}
//                         >
//                             <Text style={{ fontSize: 17, fontWeight: "900" }}>
//                                 Phone Number:
//                             </Text>
//                             <Sun size="10" color="#ff0000" style={{ flex: 1 }} />
//                         </View>
//                         <View
//                             style={{
//                                 height: 45,
//                                 width: "100%",
//                                 borderBottomWidth: 1,
//                                 flexDirection: "row",
//                                 display: "flex",
//                             }}
//                         >
//                             <TextInput
//                                 onChangeText={(text) => setPhone(text)}
//                                 value={phone}
//                             />
//                         </View>
//                     </View>

//                     <View
//                         style={{
//                             flexDirection: "column",
//                             width: "100%",
//                             color: "black",
//                             marginBottom: 15,
//                         }}
//                     >
//                         <View
//                             style={{
//                                 height: 45,
//                                 width: "100%",
//                                 alignItems: "center",
//                                 flexDirection: "row",
//                             }}
//                         >
//                             <Text style={{ fontSize: 17, fontWeight: "900" }}>Name:</Text>
//                             <Sun size="10" color="#ff0000" style={{ flex: 1 }} />
//                         </View>
//                         <View
//                             style={{
//                                 height: 45,
//                                 width: "100%",
//                                 borderBottomWidth: 1,
//                                 flexDirection: "row",
//                                 display: "flex",
//                             }}
//                         >
//                             <TextInput onChangeText={(text) => setName(text)} value={name} />
//                         </View>
//                     </View>

//                     <View
//                         style={{
//                             flexDirection: "column",
//                             width: "100%",
//                             color: "black",
//                             marginBottom: 15,
//                         }}
//                     >
//                         <View
//                             style={{
//                                 width: "100%",
//                                 alignItems: "center",
//                                 flexDirection: "row",
//                             }}
//                         >
//                             <Text style={{ fontSize: 17, fontWeight: "900" }}>Password:</Text>
//                             <Sun size="10" color="#ff0000" style={{ flex: 1 }} />
//                         </View>
//                         <View
//                             style={{
//                                 height: 45,
//                                 width: "100%",
//                                 borderBottomWidth: 1,
//                                 flexDirection: "row",
//                                 display: "flex",
//                             }}
//                         >
//                             <TextInput
//                                 onChangeText={(text) => setPassword(text)}
//                                 value={password}
//                                 secureTextEntry={true}
//                             />
//                         </View>
//                     </View>

//                     <View
//                         style={{
//                             flexDirection: "column",
//                             width: "100%",
//                             color: "black",
//                             marginBottom: 15,
//                         }}
//                     >
//                         <View
//                             style={{
//                                 width: "100%",
//                                 alignItems: "center",
//                                 flexDirection: "row",
//                             }}
//                         >
//                             <Text style={{ fontSize: 17, fontWeight: "900" }}>
//                                 Confirm Password:
//                             </Text>
//                             <Sun size="10" color="#ff0000" style={{ flex: 1 }} />
//                         </View>
//                         <View
//                             style={{
//                                 height: 45,
//                                 width: "100%",
//                                 borderBottomWidth: 1,
//                                 flexDirection: "row",
//                                 display: "flex",
//                             }}
//                         >
//                             <TextInput
//                                 onChangeText={(text) => setConfirmPassword(text)}
//                                 value={confirmPassword}
//                                 secureTextEntry={true}
//                             />
//                         </View>
//                     </View>

//                     <View
//                         style={{
//                             flexDirection: "column",
//                             width: "100%",
//                             color: "black",
//                             marginBottom: 15,
//                         }}
//                     >
//                         <View
//                             style={{
//                                 width: "100%",
//                                 alignItems: "center",
//                                 flexDirection: "row",
//                             }}
//                         >
//                             <Text style={{ fontSize: 17, fontWeight: "900" }}>Email:</Text>
//                             <Sun size="10" color="#ff0000" style={{ flex: 1 }} />
//                         </View>
//                         <View
//                             style={{
//                                 height: 45,
//                                 width: "100%",
//                                 borderBottomWidth: 1,
//                                 flexDirection: "row",
//                                 display: "flex",
//                             }}
//                         >
//                             <TextInput
//                                 onChangeText={(text) => setEmail(text)}
//                                 value={email}
//                             />
//                         </View>
//                     </View>

//                     <View style={{ flexDirection: "row", marginTop: 10 }}>
//                         <TouchableOpacity
//                             onPress={() => setStick(!stick)}
//                             style={{ width: 20, height: 20, borderWidth: 1, marginRight: 10 }}
//                         >
//                             {stick && (
//                                 <Image
//                                     style={{ width: 18, height: 18 }}
//                                     source={require("../../assets/stick1.png")}
//                                 />
//                             )}
//                         </TouchableOpacity>
//                         <Text>Tôi đồng ý với tất cả những điều trên</Text>
//                     </View>

//                     <TouchableOpacity
//                         onPress={handleRegister}
//                         style={{
//                             width: 180,
//                             height: 40,
//                             borderRadius: 15,
//                             backgroundColor: "blue",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             marginTop: 20,
//                         }}
//                     >
//                         <Text style={{ fontSize: 20, color: "white" }}>Đăng Ký</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </ScrollView>
//     );
// };

// export default RegisterForm;
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import axios from "axios";
import { Sun } from "iconsax-react-native";
import { PORT } from "../../utils/api/port";

const RegisterForm = ({ navigation }) => {
    const [stick, setStick] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        // Kiểm tra các trường thông tin có được nhập đầy đủ không
        if (!email || !phone || !password || !name || !confirmPassword) {
            Alert.alert("Error", "Vui lòng nhập đầy đủ thông tin");
            return;
        }

        // Kiểm tra mật khẩu và mật khẩu xác nhận có trùng khớp không
        if (password !== confirmPassword) {
            Alert.alert("Error", "Mật khẩu và mật khẩu xác nhận không khớp");
            return;
        }

        try {
            // Gửi request đăng ký tài khoản lên server
            const response = await axios.post(
                `${PORT}/auth/signup`,
                {
                    email: email,
                    phoneNumber: phone,
                    password: password,
                    name: name,
                    confirmPassword: confirmPassword
                },
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 10000 // Thêm timeout nếu cần
                }
            );

            // Xử lý phản hồi từ server
            console.log(response.data);
            Alert.alert("Success", "Đăng ký thành công.");
            navigation.navigate('RegisterOPT', { email });

        } catch (error) {
            // Xử lý lỗi nếu có
            console.error("Error:", error);
            Alert.alert("Error", "Đăng ký thất bại, vui lòng thử lại");
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: "white" }}>
            <View style={{ width: "100%", height: "100%", alignItems: "center", backgroundColor: "white" }}>
                <View style={{ width: "80%", height: "100%", alignItems: "center", flexDirection: "column" }}>
                    <Image source={require("../../assets/chatchit.png")} style={{ width: 90, height: 70, backgroundColor: "white", marginVertical: 20 }} />
                    <View style={{ width: "100%", marginVertical: 20, fontWeight: "800", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "black", fontWeight: "700", fontSize: 25 }}>Đăng ký tài khoản</Text>
                    </View>

                    <View style={{ flexDirection: "column", width: "100%", color: "black", marginBottom: 15 }}>
                        <View style={{ width: "100%", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 17, fontWeight: "900" }}>Phone Number:</Text>
                            <Sun size="10" color="#ff0000" style={{ flex: 1 }} />
                        </View>
                        <View style={{ height: 45, width: "100%", borderBottomWidth: 1, flexDirection: "row", display: "flex" }}>
                            <TextInput onChangeText={(text) => setPhone(text)} value={phone} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "column", width: "100%", color: "black", marginBottom: 15 }}>
                        <View style={{ height: 45, width: "100%", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 17, fontWeight: "900" }}>Name:</Text>
                            <Sun size="10" color="#ff0000" style={{ flex: 1 }} />
                        </View>
                        <View style={{ height: 45, width: "100%", borderBottomWidth: 1, flexDirection: "row", display: "flex" }}>
                            <TextInput onChangeText={(text) => setName(text)} value={name} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "column", width: "100%", color: "black", marginBottom: 15 }}>
                        <View style={{ width: "100%", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 17, fontWeight: "900" }}>Password:</Text>
                            <Sun size="10" color="#ff0000" style={{ flex: 1 }} />
                        </View>
                        <View style={{ height: 45, width: "100%", borderBottomWidth: 1, flexDirection: "row", display: "flex" }}>
                            <TextInput onChangeText={(text) => setPassword(text)} value={password} secureTextEntry={true} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "column", width: "100%", color: "black", marginBottom: 15 }}>
                        <View style={{ width: "100%", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 17, fontWeight: "900" }}>Confirm Password:</Text>
                            <Sun size="10" color="#ff0000" style={{ flex: 1 }} />
                        </View>
                        <View style={{ height: 45, width: "100%", borderBottomWidth: 1, flexDirection: "row", display: "flex" }}>
                            <TextInput onChangeText={(text) => setConfirmPassword(text)} value={confirmPassword} secureTextEntry={true} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "column", width: "100%", color: "black", marginBottom: 15 }}>
                        <View style={{ width: "100%", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 17, fontWeight: "900" }}>Email:</Text>
                            <Sun size="10" color="#ff0000" style={{ flex: 1 }} />
                        </View>
                        <View style={{ height: 45, width: "100%", borderBottomWidth: 1, flexDirection: "row", display: "flex" }}>
                            <TextInput onChangeText={(text) => setEmail(text)} value={email} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <TouchableOpacity onPress={() => setStick(!stick)} style={{ width: 20, height: 20, borderWidth: 1, marginRight: 10 }}>
                            {stick && <Image style={{ width: 18, height: 18 }} source={require("../../assets/stick1.png")} />}
                        </TouchableOpacity>
                        <Text>Tôi đồng ý với tất cả những điều trên</Text>
                    </View>

                    <TouchableOpacity onPress={handleRegister} style={{ width: 180, height: 40, borderRadius: 15, backgroundColor: "blue", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 20, color: "white" }}>Đăng Ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default RegisterForm;