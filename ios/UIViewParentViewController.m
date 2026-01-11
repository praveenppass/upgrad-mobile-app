//
//  UIView.m
//  lexMobileApp
//
//  Created by Firoj  on 30/05/25.
//


#import "UIViewParentViewController.h"

@implementation UIView (ParentViewController)

- (UIViewController *)parentViewController {
    UIResponder *responder = self;
    while (responder) {
        responder = [responder nextResponder];
        if ([responder isKindOfClass:[UIViewController class]]) {
            return (UIViewController *)responder;
        }
    }
    return nil;
}

@end
