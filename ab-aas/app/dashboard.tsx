import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageModal from '@/components/LanguageModal';
import DrawerMenu from '@/components/DrawerMenu';
import FlippableCard from '@/components/FlippableCard';

export default function DashboardScreen() {
  const { t } = useLanguage();
  const router = useRouter();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return t('goodMorning');
    } else if (hour < 17) {
      return t('goodAfternoon');
    } else {
      return t('goodEvening');
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
            style={styles.menuButton}
            onPress={() => setDrawerVisible(true)}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>{t('dashboard')}</Text>
            <Text style={styles.headerSubtitle}>{getGreeting()}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.languageButton}
              onPress={() => setLanguageModalVisible(true)}
            >
              <Image
                source={require('@/assets/language.png')}
                style={styles.languageIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => router.push('/notifications')}
            >
              <Text style={styles.notificationIcon}>🔔</Text>
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Flippable ID Card */}
        <FlippableCard />

        {/* Complete Profile Button */}
        <TouchableOpacity 
          style={styles.completeProfileButton}
          onPress={() => router.push('/profile')}
        >
          <Text style={styles.completeProfileText}>{t('completeProfile')}</Text>
          <View style={styles.profilePercentage}>
            <Text style={styles.profilePercentageText}>40%</Text>
          </View>
        </TouchableOpacity>

        {/* Action Cards Grid */}
        <View style={styles.actionCardsGrid}>
          <Image
            source={require('@/assets/logo.png')}
            style={styles.actionCardsBackground}
            resizeMode="contain"
          />
          {/* Apply Benefits Card */}
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/benefits')}
          >
            <Image
              source={require('../assets/dashboard-benifit.png')}
              style={styles.actionCardIcon}
              resizeMode="contain"
            />
            <Text style={styles.actionCardTitle}>{t('applyBenefits')}</Text>
            <Text style={styles.actionCardSubtitle}>{t('viewStatus')}</Text>
          </TouchableOpacity>

          {/* Support Card */}
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/support')}
          >
            <Image
              source={require('@/assets/dashboard-support.png')}
              style={styles.actionCardIcon}
              resizeMode="contain"
            />
            <Text style={styles.actionCardTitle}>{t('support')}</Text>
            <Text style={styles.actionCardSubtitle}>{t('getHelp')}</Text>
          </TouchableOpacity>

        


        </View>

        {/* Bottom Text */}
        <Text style={styles.bottomText}>{t('bottomSlogan')}</Text>
      </ScrollView>

      <LanguageModal 
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
      />

      <DrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    position: 'relative',
  },
  menuButton: {
    position: 'absolute',
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: '#333',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: '#C03825',
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: '#999',
  },
  headerRight: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    // backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageIcon: {
    width: 25,
    height: 25,
  },
  notificationButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    // backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },

  completeProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#B8432E',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  completeProfileText: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: '#fff',
  },
  profilePercentage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#C03825',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#E8935C',
  },
  profilePercentageText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: '#fff',
  },
  actionCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    marginTop: 20,
    gap: 10,
    position: 'relative',
  },
  actionCardsBackground: {
    position: 'absolute',
    opacity: 0.1,
    marginTop:-20,
    zIndex: 0,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 1,
  },
  actionCardIcon: {
    width: 70,
    height: 70,
    marginBottom: 12,
  },
  actionCardTitle: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: '#333',
    marginBottom: 4,
  },
  actionCardSubtitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: '#999',
  },
  bottomText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: '#C03825',
    textAlign: 'center',
    marginTop: 120,
    // marginBottom: 20,
  },
});
