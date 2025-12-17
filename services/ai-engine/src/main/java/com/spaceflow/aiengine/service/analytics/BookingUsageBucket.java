package com.spaceflow.aiengine.service.analytics;

/**
 * Local mirror of Analytics Service BookingUsageBucket.
 */
public class BookingUsageBucket {

    private String periodStart;
    private String periodEnd;
    private Long bookedCount;
    private Long usedCount;
    private Long noShowCount;
    private Long cancelledCount;

    public String getPeriodStart() {
        return periodStart;
    }

    public void setPeriodStart(String periodStart) {
        this.periodStart = periodStart;
    }

    public String getPeriodEnd() {
        return periodEnd;
    }

    public void setPeriodEnd(String periodEnd) {
        this.periodEnd = periodEnd;
    }

    public Long getBookedCount() {
        return bookedCount;
    }

    public void setBookedCount(Long bookedCount) {
        this.bookedCount = bookedCount;
    }

    public Long getUsedCount() {
        return usedCount;
    }

    public void setUsedCount(Long usedCount) {
        this.usedCount = usedCount;
    }

    public Long getNoShowCount() {
        return noShowCount;
    }

    public void setNoShowCount(Long noShowCount) {
        this.noShowCount = noShowCount;
    }

    public Long getCancelledCount() {
        return cancelledCount;
    }

    public void setCancelledCount(Long cancelledCount) {
        this.cancelledCount = cancelledCount;
    }
}


