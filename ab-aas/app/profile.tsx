import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { updateUser } from '@/services/userService';
import DisabilityModal from '@/components/DisabilityModal';
import GenderModal from '@/components/GenderModal';
import StateDistrictModal from '@/components/StateDistrictModal';

export default function ProfileScreen() {
    const router = useRouter();
    const { t } = useLanguage();
    const { userData, loadUserData } = useUser();
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [alternateMobile, setAlternateMobile] = useState('');
    const [disabilityType, setDisabilityType] = useState('');
    const [disabilityPercentage, setDisabilityPercentage] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [disabilityModalVisible, setDisabilityModalVisible] = useState(false);
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [stateModalVisible, setStateModalVisible] = useState(false);
    const [districtModalVisible, setDistrictModalVisible] = useState(false);
    const [fetchingPincode, setFetchingPincode] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
    const [saving, setSaving] = useState(false);

    // Load user data when component mounts
    useEffect(() => {
        if (userData) {
            setFullName(userData.fullName || '');
            setGender(userData.gender || '');
            setDob(userData.dob || '');
            setPhoneNumber(userData.phoneNumber || '');
            setAlternateMobile(userData.alternateMobile || '');
            setDisabilityType(userData.disabilityType || '');
            setDisabilityPercentage(userData.disabilityPercentage || '');
            setPinCode(userData.pinCode || '');
            setState(userData.state || '');
            setDistrict(userData.district || '');
            setAddress(userData.address || '');
            setAadharNumber(userData.aadharNumber || '');
            setMonthlyIncome(userData.monthlyIncome || '');
        }
    }, [userData]);

    const fetchLocationFromPincode = async (pincode: string) => {
        if (pincode.length !== 6) return;

        setFetchingPincode(true);
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();

            if (data[0].Status === 'Success' && data[0].PostOffice) {
                const postOffice = data[0].PostOffice[0];
                setState(postOffice.State);
                setDistrict(postOffice.District);
            } else {
                Alert.alert(
                    t('error'),
                    t('invalidPincode'),
                    [{ text: t('ok') }]
                );
            }
        } catch (error) {
            console.error('Error fetching pincode:', error);
            Alert.alert(
                t('error'),
                t('pincodeError'),
                [{ text: t('ok') }]
            );
        } finally {
            setFetchingPincode(false);
        }
    };

    const handleSave = async () => {
        if (!userData?.phoneNumber) {
            Alert.alert(t('error'), 'User not found. Please register first.');
            return;
        }

        setSaving(true);

        try {
            const profileData = {
                fullName,
                gender,
                dob,
                phoneNumber,
                alternateMobile,
                disabilityType,
                disabilityPercentage,
                pinCode,
                state,
                district,
                address,
                aadharNumber,
                monthlyIncome,
            };

            await updateUser(userData.phoneNumber, profileData);
            await loadUserData(userData.phoneNumber);

            // Alert.alert(
            //     t('success'),
            //     'Profile updated successfully!',
            //     [
            //         {
            //             text: t('ok'),
            //             onPress: () => router.back(),
            //         },
            //     ]
            // );
            router.back()
        } catch (error) {
            console.error('Error saving profile:', error);
            Alert.alert(
                t('error'),
                'Failed to save profile. Please try again.'
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="chevron-back" size={24} color="#333" />
                    </TouchableOpacity>

                    {/* Profile Icon */}
                    <View style={styles.profileIconContainer}>
                        <View style={styles.profileIcon}>
                            <Ionicons name="person" size={15} color="#fff" />
                        </View>
                        <Text style={styles.title}>{t('personalInformation')}</Text>
                    </View>


                </View>

                {/* Illustration */}
                <Image
                    source={require('@/assets/profile_banner.png')}
                    style={styles.illustration}
                    resizeMode="contain"
                />

                {/* Subtitle */}
                <Text style={styles.subtitle}>{t('completeYourProfile')}</Text>
                <Text style={styles.description}>{t('profileDescription')}</Text>

                {/* Form */}
                <View style={styles.form}>
                    {/* Full Name */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t('fullName')}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={t('fullName')}
                            value={fullName}
                            onChangeText={setFullName}
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Gender and DOB Row */}
                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>{t('gender')}</Text>
                            <TouchableOpacity
                                style={styles.dropdownInput}
                                onPress={() => setGenderModalVisible(true)}
                            >
                                <Text style={[styles.dropdownText, !gender && styles.placeholder]}>
                                    {gender || t('gender')}
                                </Text>
                                <Ionicons name="chevron-down" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>{t('dob')}</Text>
                            <TouchableOpacity
                                style={styles.dropdownInput}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text style={[styles.dropdownText, !dob && styles.placeholder]}>
                                    {dob || t('dob')}
                                </Text>
                                <Ionicons name="calendar-outline" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Phone Number */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t('phoneNumber')}</Text>
                        <View style={styles.phoneInputContainer}>
                            <View style={styles.countryCode}>
                                <Text style={styles.countryCodeText}>+91</Text>
                            </View>
                            <TextInput
                                style={styles.phoneInput}
                                placeholder={t('phoneNumber')}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="phone-pad"
                                placeholderTextColor="#999"
                            />
                        </View>
                    </View>

                    {/* Alternate Mobile Number */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t('alternateMobile')}</Text>
                        <View style={styles.phoneInputContainer}>
                            <View style={styles.countryCode}>
                                <Text style={styles.countryCodeText}>+91</Text>
                            </View>
                            <TextInput
                                style={styles.phoneInput}
                                placeholder={t('alternateMobile')}
                                value={alternateMobile}
                                onChangeText={setAlternateMobile}
                                keyboardType="phone-pad"
                                placeholderTextColor="#999"
                            />
                        </View>
                    </View>

                    {/* Type of Disability */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t('typeOfDisability')}</Text>
                        <TouchableOpacity
                            style={styles.dropdownInput}
                            onPress={() => setDisabilityModalVisible(true)}
                        >
                            <Text style={[styles.dropdownText, !disabilityType && styles.placeholder]}>
                                {disabilityType || t('typeOfDisability')}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#999" />
                        </TouchableOpacity>
                    </View>

                    {/* % of Disability */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t('percentageOfDisability')}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={t('percentageOfDisability')}
                            value={disabilityPercentage}
                            onChangeText={setDisabilityPercentage}
                            keyboardType="numeric"
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Pin Code */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t('pinCode')}</Text>
                        <View style={styles.pincodeContainer}>
                            <TextInput
                                style={styles.pincodeInput}
                                placeholder={t('pinCode')}
                                value={pinCode}
                                onChangeText={(text) => {
                                    setPinCode(text);
                                    if (text.length === 6) {
                                        fetchLocationFromPincode(text);
                                    }
                                }}
                                keyboardType="numeric"
                                maxLength={6}
                                placeholderTextColor="#999"
                            />
                            {fetchingPincode && (
                                <Text style={styles.fetchingText}>{t('fetching')}</Text>
                            )}
                        </View>
                    </View>

                    {/* State and District Row */}
                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>{t('state')}</Text>
                            <TouchableOpacity
                                style={styles.dropdownInput}
                                onPress={() => setStateModalVisible(true)}
                            >
                                <Text style={[styles.dropdownText, !state && styles.placeholder]}>
                                    {state || t('state')}
                                </Text>
                                <Ionicons name="chevron-down" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>{t('district')}</Text>
                            <TouchableOpacity
                                style={styles.dropdownInput}
                                onPress={() => setDistrictModalVisible(true)}
                                disabled={!state}
                            >
                                <Text style={[styles.dropdownText, !district && styles.placeholder]}>
                                    {district || t('district')}
                                </Text>
                                <Ionicons name="chevron-down" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Address */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t('address')}</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder={t('enterAddress')}
                            value={address}
                            onChangeText={setAddress}
                            placeholderTextColor="#999"
                            multiline
                            numberOfLines={3}
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Aadhar Number */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t('aadharNumber')}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={t('aadharNumber')}
                            value={aadharNumber}
                            onChangeText={setAadharNumber}
                            keyboardType="numeric"
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Monthly Income */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t('monthlyIncome')}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={t('monthlyIncome')}
                            value={monthlyIncome}
                            onChangeText={setMonthlyIncome}
                            keyboardType="numeric"
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                        style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                        onPress={handleSave}
                        disabled={saving}
                    >
                        {saving ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <Text style={styles.saveButtonText}>{t('save')}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <DisabilityModal
                visible={disabilityModalVisible}
                selectedDisability={disabilityType}
                onClose={() => setDisabilityModalVisible(false)}
                onSelect={(disability) => {
                    setDisabilityType(disability);
                    setDisabilityModalVisible(false);
                }}
            />

            <GenderModal
                visible={genderModalVisible}
                selectedGender={gender}
                onClose={() => setGenderModalVisible(false)}
                onSelect={(selectedGender) => {
                    setGender(selectedGender);
                    setGenderModalVisible(false);
                }}
            />

            <StateDistrictModal
                visible={stateModalVisible}
                type="state"
                selectedValue={state}
                onClose={() => setStateModalVisible(false)}
                onSelect={(selectedState) => {
                    setState(selectedState);
                    setDistrict(''); // Reset district when state changes
                }}
            />

            <StateDistrictModal
                visible={districtModalVisible}
                type="district"
                selectedValue={district}
                stateForDistrict={state}
                onClose={() => setDistrictModalVisible(false)}
                onSelect={(selectedDistrict) => {
                    setDistrict(selectedDistrict);
                }}
            />

            {showDatePicker && (
                <DateTimePicker
                    value={dateOfBirth || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(Platform.OS === 'ios');
                        if (selectedDate) {
                            setDateOfBirth(selectedDate);
                            const formattedDate = selectedDate.toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            });
                            setDob(formattedDate);
                        }
                    }}
                    maximumDate={new Date()}
                    minimumDate={new Date(1900, 0, 1)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    profileIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    profileIcon: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: '#C03825',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: '#C03825',
    },
    illustration: {
        width: 300,
        height: 220,
        alignSelf: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: Fonts.semiBold,
        color: '#C03825',
        textAlign: 'center',
        marginTop: 10,
    },
    description: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: '#999',
        textAlign: 'center',
        marginTop: 8,
        paddingHorizontal: 40,
    },
    form: {
        paddingHorizontal: 20,
        marginTop: 30,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    halfInput: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 12,
    },
    label: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: '#333',
        // marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#333',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    dropdownInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    dropdownText: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#333',
    },
    placeholder: {
        color: '#999',
    },
    phoneInputContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    countryCode: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    countryCodeText: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: '#333',
    },
    phoneInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#333',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    saveButton: {
        backgroundColor: '#C03825',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#fff',
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonDisabled: {
        backgroundColor: '#999',
        opacity: 0.6,
    },
    saveButtonText: {
        fontSize: 16,
        fontFamily: Fonts.semiBold,
        color: '#fff',
    },
    pincodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    pincodeInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#333',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    fetchingText: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: '#C03825',
    },
    textArea: {
        minHeight: 80,
        paddingTop: 8,
    },
});
