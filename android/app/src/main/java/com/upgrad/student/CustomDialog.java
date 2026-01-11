package com.upgrad.student;

import android.app.AlertDialog;
import android.content.Context;
import android.graphics.Typeface;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;

import java.util.List;

public class CustomDialog {

    public interface ListSelectionListener {
        void onItemSelected(int index, String item);
    }

    private final Context context;

    public CustomDialog(Context context) {
        this.context = context;
    }

    public void showListDialog(String title, List<String> options, int preselectedIndex,
                               boolean isRadioButton, ListSelectionListener listener) {
        if (options == null || options.isEmpty()) {
            Toast.makeText(context, "No options available", Toast.LENGTH_SHORT).show();
            return;
        }

        String[] itemsArray = options.toArray(new String[0]);

        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle(title);
        if (isRadioButton) {
            builder.setSingleChoiceItems(itemsArray, preselectedIndex, (dialog, which) -> {
                if (listener != null) {
                    listener.onItemSelected(which, itemsArray[which]);
                }
                dialog.dismiss();
            });
        } else {
            ArrayAdapter<String> adapter = new ArrayAdapter<String>(context, android.R.layout.simple_list_item_1, itemsArray) {
                @NonNull
                @Override
                public View getView(int position, View convertView, @NonNull ViewGroup parent) {
                    // Create horizontal layout
                    LinearLayout layout = new LinearLayout(context);
                    layout.setOrientation(LinearLayout.HORIZONTAL);
                    layout.setPadding(50, 20, 32, 20);
                    layout.setLayoutParams(new ViewGroup.LayoutParams(
                            ViewGroup.LayoutParams.MATCH_PARENT,
                            ViewGroup.LayoutParams.WRAP_CONTENT
                    ));
                    layout.setGravity(android.view.Gravity.CENTER_VERTICAL);

                    // TextView for item text
                    TextView textView = new TextView(context);
                    textView.setText(itemsArray[position]);
                    textView.setTextSize(16f);
                    textView.setTextColor(ContextCompat.getColor(context, android.R.color.black));
                    textView.setLayoutParams(new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));

                    // TextView for ">>" icon
                    TextView arrowView = new TextView(context);
                    arrowView.setText(">");
                    arrowView.setTextSize(14f);
                    arrowView.setTypeface(null, Typeface.BOLD); // Make text bold
                    arrowView.setTextColor(ContextCompat.getColor(context, android.R.color.black)); // Set text color to black
                    arrowView.setPadding(10, 0, 40, 0);

                    // Add views to layout
                    layout.addView(textView);
                    layout.addView(arrowView);

                    return layout;
                }
            };

            builder.setAdapter(adapter, (dialog, which) -> {
                if (listener != null) {
                    listener.onItemSelected(which, itemsArray[which]);
                }
                dialog.dismiss();
            });
        }

        builder.setNegativeButton("Cancel", (dialog, which) -> dialog.dismiss());
        AlertDialog dialog = builder.create();
        dialog.show();

        // Apply custom background with rounded corners
        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawable(
                    ContextCompat.getDrawable(context, R.drawable.rounded_dialog_background)
            );
        }
    }

}
