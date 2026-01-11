import UIKit
import React
import Firebase
import CodePush
import AVFoundation
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: RCTAppDelegate {
    
  var orientationLock = UIInterfaceOrientationMask.portrait

    override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Firebase setup
        FirebaseApp.configure()
        
        self.moduleName = "lexMobileApp"
        self.dependencyProvider = RCTAppDependencyProvider()
        
        // You can add your custom initial props in the dictionary below.
        // They will be passed down to the ViewController used by React Native.
        self.initialProps = [:]
        
        // Configure AVAudioSession to allow audio playback in the background
        do {
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
        } catch {
            print("Error setting AVAudioSessionCategoryPlayback: \(error)")
        }
        
        // Read deployment key from Info.plist (configured via react-native-config)
        if let codePushDeploymentKey = Bundle.main.object(forInfoDictionaryKey: "CodePushDeploymentKey") as? String {
            CodePush.setDeploymentKey(codePushDeploymentKey)
            print("✅ CodePush deployment key found: \(codePushDeploymentKey)")
        } else {
            print("❌ CodePush deployment key not found in Info.plist!")
        }

      // 🔑 Listen for orientation lock notifications
      NotificationCenter.default.addObserver(
          self,
          selector: #selector(lockOrientationNotification(_:)),
          name: Notification.Name("lockOrientation"),
          object: nil
      )
        
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }
    
    override func sourceURL(for bridge: RCTBridge) -> URL? {
        return bundleURL()
    }
    
//    override func bundleURL() -> URL? {
//        #if DEBUG
//        return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
//        #else
//        return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
//        #endif
//    }
  
  override func bundleURL() -> URL? {
    #if DEBUG
    let url = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    print("👨‍💻 [DEBUG] JS Bundle URL: \(String(describing: url))")
    return url
    #else
    if let codePushURL = CodePush.bundleURL() {
      print("📦 [CodePush] Using bundle at: \(codePushURL)")
      return codePushURL
    } else if let fallback = Bundle.main.url(forResource: "main", withExtension: "jsbundle") {
      print("🧯 [Fallback] Using embedded main.jsbundle at: \(fallback)")
      return fallback
    } else {
      print("❌ No JS bundle found")
      return nil
    }
    #endif
  }

  


    
    // Deep linking
    override func application(_ application: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        return RCTLinkingManager.application(application, open: url, options: options)
    }
    
    // Universal linking
  override func application(
    _ application: UIApplication,
    continue userActivity: NSUserActivity,
    restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
  ) -> Bool {
      return RCTLinkingManager.application(application, continue: userActivity, restorationHandler: restorationHandler)
  }

  // ✅ iOS asks which orientations are allowed
     override func application(_ application: UIApplication,
                               supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
         return orientationLock
     }

     // ✅ Handle orientation lock notification
    @objc private func lockOrientationNotification(_ notification: Notification) {
        guard let userInfo = notification.userInfo,
              let maskValue = userInfo["mask"] as? Int,
              let rotateValue = userInfo["rotate"] as? Int else {
            return
        }

        let mask = UIInterfaceOrientationMask(rawValue: UInt(maskValue))
        let rotate = UIInterfaceOrientation(rawValue: rotateValue) ?? .unknown

        orientationLock = mask
        UIDevice.current.setValue(rotate.rawValue, forKey: "orientation")
        UINavigationController.attemptRotationToDeviceOrientation()
    }

}
