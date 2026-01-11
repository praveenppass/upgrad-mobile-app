package com.upgrad.student;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkCapabilities;
import android.net.NetworkInfo;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.net.TrafficStats;
import android.util.Log;

public class NetworkUtil {

    private static final String TAG = "NetworkUtil";
    private static final int SPEED_TEST_DURATION_MS = 2000;
    private static final int SLOW_SPEED_THRESHOLD_KBPS = 100;

    public interface NetworkCallback {
        void onResult(boolean isConnected, boolean isSlow);
    }

    private final Context context;

    public NetworkUtil(Context context) {
        this.context = context.getApplicationContext();
    }

    public void checkNetworkStatus(NetworkCallback callback) {
        boolean isConnected = isNetworkAvailable();
        if (!isConnected) {
            new Handler(Looper.getMainLooper()).post(() -> callback.onResult(false, false));
            return;
        }

        new Thread(() -> {
            try {
                long beforeBytes = TrafficStats.getTotalRxBytes() + TrafficStats.getTotalTxBytes();
                long startTime = System.currentTimeMillis();

                Thread.sleep(SPEED_TEST_DURATION_MS);

                long afterBytes = TrafficStats.getTotalRxBytes() + TrafficStats.getTotalTxBytes();
                long endTime = System.currentTimeMillis();

                long bytesDiff = afterBytes - beforeBytes;
                long timeDiffMs = endTime - startTime;

                float kbps = calculateSpeedKbps(bytesDiff, timeDiffMs);
                boolean isSlow = kbps < SLOW_SPEED_THRESHOLD_KBPS;

                Log.d(TAG, String.format(
                        "Network stats - Bytes: %d, Time: %dms, Speed: %.2f kbps",
                        bytesDiff, timeDiffMs, kbps
                ));

                new Handler(Looper.getMainLooper()).post(() ->
                        callback.onResult(true, isSlow)
                );

            } catch (Exception e) {
                Log.e(TAG, "Error measuring network speed", e);
                new Handler(Looper.getMainLooper()).post(() ->
                        callback.onResult(isConnected, false)
                );
            }
        }).start();
    }

    private float calculateSpeedKbps(long bytesDiff, long timeDiffMs) {
        if (timeDiffMs <= 0) return 0;
        return (bytesDiff * 8f) / timeDiffMs;
    }

    private boolean isNetworkAvailable() {
        ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        if (cm == null) return false;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            NetworkCapabilities nc = cm.getNetworkCapabilities(cm.getActiveNetwork());
            return nc != null && nc.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET);
        } else {
            NetworkInfo info = cm.getActiveNetworkInfo();
            return info != null && info.isConnected();
        }
    }
}