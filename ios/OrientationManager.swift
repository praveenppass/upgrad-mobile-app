//
//  OrientationManager.swift
//  lexMobileApp
//
//  Created by Firoj  on 19/08/25.
//

import Foundation
import UIKit

@objc class OrientationManager: NSObject {
    @objc static func lockToPortrait() {
        if let delegate = UIApplication.shared.delegate as? AppDelegate {
            delegate.orientationLock = .portrait
        }
        UIDevice.current.setValue(UIInterfaceOrientation.portrait.rawValue, forKey: "orientation")
    }

    @objc static func lockToLandscape() {
        if let delegate = UIApplication.shared.delegate as? AppDelegate {
            delegate.orientationLock = .landscapeRight
        }
        UIDevice.current.setValue(UIInterfaceOrientation.landscapeRight.rawValue, forKey: "orientation")
    }
}
