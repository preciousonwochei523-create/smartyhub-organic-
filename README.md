# Organic to Logistics: install in this order
Folder `supabase/functions/<name>/index.ts` matches your Supabase project.

1. SQL editor: run `migration.sql`.
2. Secrets (Organic project):
   supabase secrets set LOGISTICS_URL=https://<LOGISTICS-REF>.supabase.co LOGISTICS_API_KEY=<organic key> LOGISTICS_WEBHOOK_SECRET=<organic out_secret> LOGISTICS_FROM=<now, e.g. 2026-11-12T00:00:00Z>
   (LOGISTICS_FROM stops orders accepted before today being sent.)
3. Deploy, all with JWT verification OFF:
   supabase functions deploy partner-api --no-verify-jwt
   supabase functions deploy logistics-status --no-verify-jwt
   supabase functions deploy paystack-webhook --no-verify-jwt
4. Logistics project: businesses.webhook_url for organic must be https://<ORGANIC-REF>.supabase.co/functions/v1/logistics-status
5. Upload `vendor.html` and `admin.html` to the Organic site.
6. Check that Organic zone names match zones your riders have switched on.

## Vendor payment on "shipped" (added)
- Deploy `pay-init` too (customer payments no longer split to vendors; money stays in your Paystack balance).
- Secret: `supabase secrets set VENDOR_PAY_FROM=<same date as LOGISTICS_FROM>`. Orders paid before the change were already paid to vendors, so they are skipped.
- Paystack dashboard: Settings, Preferences, turn OFF "Confirm transfers before sending" (otherwise transfers wait for an OTP).
- Each vendor needs bank name, account number and bank code saved in Delivery & Partners.
- Paystack settles customer payments to your balance the next business day. If the balance is short, the transfer fails, is logged, and is retried when the vendor reopens the page.

## Delivery code and rider pay (added)
- LOGISTICS project: run `logistics/delivery-code.sql`. Organic deliveries now need a 4-digit code before a rider can mark them delivered.
- ORGANIC project: deploy `delivery-code` and the updated `logistics-status` (both `--no-verify-jwt`). Run the new part of `migration.sql`.
- Upload `index.html` (the storefront). The "Track an order" box now shows the code while the order is being prepared or on the way.
- Riders in SmartyHub Fleet are paid automatically when the code is entered, from the zone rider pay in your finance settings, to the bank details saved under the rider's name (same name as in the logistics app). Other companies' riders are skipped and logged. If a payment fails, the reason is in the order's event log: pay it with the existing rider payout.
- Secret `RIDER_PAY_FLEET` only if your fleet name is not exactly `SmartyHub Fleet`.

## Rider bank details from the rider app (added)
- LOGISTICS project: run `logistics/rider-bank.sql`, deploy `logistics/functions/rider-bank` (`--no-verify-jwt`).
- New riders enter their bank details when they register (and any rider can edit them in Profile). When a SmartyHub Fleet rider's delivery is completed, Organic fetches those details and pays. Riders who have not added any fall back to the account saved under their name in Delivery & Partners, otherwise the failure is logged on the order.
- Only businesses with `pays_riders = true` (Organic) can fetch bank details. Fleets and other riders can never read them.
- Check bank codes in the rider app against Paystack's bank list (GET https://api.paystack.co/bank?country=nigeria).
